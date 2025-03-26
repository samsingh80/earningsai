sap.ui.define(["sap/ui/model/json/JSONModel"], function (JSONModel) {
  "use strict";

  const initialData = {
    busyIndicator: false,
    enableSubmit: false,
    messages: [
      {
        message: "Hi",
        actor: "user",
      },
      {
        message: "Hello How are you!!",
        actor: "bot",
        userMessage:"Hi"    }
    ]
  };

  return JSONModel.extend("com.sap.shae.flp.plugins.homepage.chatModel", {
    /**
     * Constructor for the Chat Model - initialize the data
     */
    constructor: function () {
      JSONModel.prototype.constructor.apply(this, arguments);

      this.reset();
    },

    /**
     * Resets the model's Chat
     */
    reset: function () {
      this.setProperty("/", Object.create(initialData));
    },

    /**
     * Set Enable Submit button
     *
     * @param {Boolean}  value
     */
    setSubmit: function (enableSubmit) {
      this.setProperty("/enableSubmit", enableSubmit);
    },

    /**
     * Set User Chat Message
     *
     * @param {String}  message
     */
    addUserChat: function (message) {
      let amsg = this.getProperty("/messages");
      amsg.push({
        message: message,
        actor: "user",
      });
      this.setProperty("/messages", amsg);
    },

    /**
     * Set Bot Chat Message
     *
     * @param {String}  message
     */
    addBotChat: function (message,userMessage) {
      let amsg = this.getProperty("/messages");
      amsg.push({
        message: message,
        userMessage:userMessage,
        actor: "bot",
      });
      this.setProperty("/messages", amsg);
    },
  });
});
