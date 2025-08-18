package com.emailtool.dto;

import java.util.List;

public class ChatCompletionResponse {
    private List<Choice> choices;

    public ChatCompletionResponse() {}

    public List<Choice> getChoices() {
        return choices;
    }

    public void setChoices(List<Choice> choices) {
        this.choices = choices;
    }

    public static class Choice {
        private ChatMessage message;

        public Choice() {}

        public ChatMessage getMessage() {
            return message;
        }

        public void setMessage(ChatMessage message) {
            this.message = message;
        }
    }
}
