sap.ui.define(["sap/ui/model/json/JSONModel"], function (JSONModel) {
  "use strict";

  const initialData = {
    busyIndicator: false,
    enableSubmit: false,
    visibleResult:false,
    userMessage : "",
    result:      ""
  
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
     * Set Enable Result Box
     *
     * @param {Boolean}  value
     */
    setvisibleResult: function (visibleResult) {
      this.setProperty("/visibleResult", visibleResult);
    },
   
    /**
     * Set Bot Chat Message
     *
     * @param {String}  message
     */
    setResult: function (result) {
      this.setProperty("/result", result);
    },
  });
});
