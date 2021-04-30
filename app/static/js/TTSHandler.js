/**
 * Handler for Speech Synthesis
 */
export class TTSHandler {
    /**
     * Main function of TTS Handler
     * @param {String} msg - message to be spoken by Speech Synthesis
     */
    static main(msg) {
        let speechSynthesisUtterance = new SpeechSynthesisUtterance()
        speechSynthesisUtterance.text = msg
        window.speechSynthesis.speak(speechSynthesisUtterance)    
    }
}