class ActionProvider {
    constructor(createChatBotMessage, setStateFunc) {
      this.createChatBotMessage = createChatBotMessage;
      this.setState = setStateFunc;
    }
  
    handleDefault = (message) => {
      const botMessage = this.createChatBotMessage(
        `Sorry, I didn't understand "${message}". Can you please rephrase?`
      );
  
      this.setChatbotMessage(botMessage);
    };
  
    setChatbotMessage = (message) => {
      this.setState((prev) => ({
        ...prev,
        messages: [...prev.messages, message],
      }));
    };
  }
  
  export default ActionProvider;
  