package com.emailtool.controller;

import com.emailtool.dto.GrammarCheckRequest;
import com.emailtool.dto.GrammarCheckResponse;
import com.emailtool.service.LlamaGrammarService;
import jakarta.validation.Valid;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Mono;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:3000")
public class GrammarController {
    private static final Logger logger = LoggerFactory.getLogger(GrammarController.class);
    
    private final LlamaGrammarService grammarService;

    public GrammarController(LlamaGrammarService grammarService) {
        this.grammarService = grammarService;
    }

    @PostMapping("/grammar-check")
    public Mono<ResponseEntity<GrammarCheckResponse>> checkGrammar(@Valid @RequestBody GrammarCheckRequest request) {
        logger.info("Grammar check requested for text: {}", request.getText().substring(0, Math.min(50, request.getText().length())));
        
        return grammarService.correctGrammar(request.getText())
            .map(correctedText -> {
                boolean hasChanges = !correctedText.equals(request.getText());
                GrammarCheckResponse response = new GrammarCheckResponse(
                    request.getText(),
                    correctedText,
                    hasChanges
                );
                logger.info("Grammar check completed, hasChanges: {}", hasChanges);
                return ResponseEntity.ok(response);
            })
            .onErrorResume(error -> {
                logger.error("Error during grammar check: {}", error.getMessage());
                GrammarCheckResponse errorResponse = new GrammarCheckResponse(
                    request.getText(),
                    request.getText(),
                    false
                );
                return Mono.just(ResponseEntity.ok(errorResponse));
            });
    }
}
