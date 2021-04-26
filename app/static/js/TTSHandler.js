/**
 * Handler for Speech Synthesis
 */
export class TTSHandler {
    /**
     * Main function of TTS Handler
     * @param {String} msg - message to be spoken by Speech Synthesis
     */
    static main(msg) {
        console.log('SpeechSynthesisUtterance :>> ' + msg)
        let speechSynthesisUtteranc = new SpeechSynthesisUtterance()
        speechSynthesisUtteranc.text = msg
        window.speechSynthesis.speak(speechSynthesisUtteranc)    
    }
}