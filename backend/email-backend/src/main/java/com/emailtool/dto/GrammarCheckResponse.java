package com.emailtool.dto;

public class GrammarCheckResponse {
    private String correctedText;
    private String originalText;
    private boolean hasChanges;

    public GrammarCheckResponse() {}

    public GrammarCheckResponse(String originalText, String correctedText, boolean hasChanges) {
        this.originalText = originalText;
        this.correctedText = correctedText;
        this.hasChanges = hasChanges;
    }

    public String getCorrectedText() {
        return correctedText;
    }

    public void setCorrectedText(String correctedText) {
        this.correctedText = correctedText;
    }

    public String getOriginalText() {
        return originalText;
    }

    public void setOriginalText(String originalText) {
        this.originalText = originalText;
    }

    public boolean isHasChanges() {
        return hasChanges;
    }

    public void setHasChanges(boolean hasChanges) {
        this.hasChanges = hasChanges;
    }
}
