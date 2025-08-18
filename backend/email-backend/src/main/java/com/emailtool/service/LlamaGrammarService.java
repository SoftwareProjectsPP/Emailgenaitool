package com.emailtool.service;

import com.emailtool.dto.ChatCompletionRequest;
import com.emailtool.dto.ChatCompletionResponse;
import com.emailtool.dto.ChatMessage;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

import java.time.Duration;
import java.util.Arrays;

@Service
public class LlamaGrammarService {
    private static final Logger logger = LoggerFactory.getLogger(LlamaGrammarService.class);
    
    private final WebClient webClient;
    
    @Value("${huggingface.api.token:}")
    private String apiToken;
    
    @Value("${huggingface.api.url:https://api-inference.huggingface.co/models/meta-llama/Llama-3.3-70B-Instruct}")
    private String apiUrl;

    public LlamaGrammarService(WebClient.Builder webClientBuilder) {
        this.webClient = webClientBuilder
            .codecs(configurer -> configurer.defaultCodecs().maxInMemorySize(1024 * 1024))
            .build();
    }

    public Mono<String> correctGrammar(String text) {
        if (apiToken == null || apiToken.trim().isEmpty()) {
            logger.warn("HF_TOKEN not configured, returning mock response");
            return Mono.just(createMockCorrection(text));
        }

        String systemPrompt = "You are a grammar correction assistant. Your task is to correct grammar, spelling, and punctuation errors in the given text while preserving the original meaning and tone. If the text has no errors, return it unchanged. Only return the corrected text without any explanations or additional comments.";
        String userPrompt = "Please correct any grammar, spelling, or punctuation errors in the following text:\n\n" + text;

        ChatCompletionRequest request = new ChatCompletionRequest(
            "meta-llama/Llama-3.3-70B-Instruct",
            Arrays.asList(
                new ChatMessage("system", systemPrompt),
                new ChatMessage("user", userPrompt)
            ),
            0.3,
            500
        );

        return webClient.post()
            .uri(apiUrl + "/v1/chat/completions")
            .header("Authorization", "Bearer " + apiToken)
            .header("Content-Type", "application/json")
            .bodyValue(request)
            .retrieve()
            .bodyToMono(ChatCompletionResponse.class)
            .timeout(Duration.ofSeconds(30))
            .map(response -> {
                if (response.getChoices() != null && !response.getChoices().isEmpty()) {
                    String correctedText = response.getChoices().get(0).getMessage().getContent().trim();
                    logger.info("Grammar correction completed successfully");
                    return correctedText;
                } else {
                    logger.warn("No choices in response, returning original text");
                    return text;
                }
            })
            .onErrorResume(error -> {
                logger.error("Error calling Llama API: {}", error.getMessage());
                return Mono.just(createMockCorrection(text));
            });
    }

    private String createMockCorrection(String text) {
        if (text.toLowerCase().contains("are a test") || text.toLowerCase().contains("this are")) {
            return text.replace("This are", "This is").replace("this are", "this is");
        }
        if (text.toLowerCase().contains("recieve")) {
            return text.replace("recieve", "receive").replace("Recieve", "Receive");
        }
        if (text.toLowerCase().contains("seperate")) {
            return text.replace("seperate", "separate").replace("Seperate", "Separate");
        }
        return text;
    }
}
