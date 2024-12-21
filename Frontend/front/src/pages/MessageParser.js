class MessageParser {
    constructor(actionProvider) {
      this.actionProvider = actionProvider;
    }
  
    parse(message) {
      console.log(message);
      this.actionProvider.handleDefault(message);
    }
  }
  
  export default MessageParser;
  