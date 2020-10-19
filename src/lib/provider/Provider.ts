export default interface Provider {
    /**
     * Get API key of the model this provider is bound to
     */
    getApiKey: () => string;
}
