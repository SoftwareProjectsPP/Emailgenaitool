package com.emailtool.dto;

import jakarta.validation.constraints.NotBlank;

public class GrammarCheckRequest {
    @NotBlank(message = "Text is required")
    private String text;

    public GrammarCheckRequest() {}

    public GrammarCheckRequest(String text) {
        this.text = text;
    }

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }
}
