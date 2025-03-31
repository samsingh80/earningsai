sap.ui.define(["sap/ui/core/mvc/Controller"], (Controller) => {
  "use strict";

  return Controller.extend("earningsai.controller.EarningsView", {
    onInit() {},

    onAfterRendering: function () {
      let me = this;
      me.attachEventchatFeedInput(me);
    },

    /**
     * Event handler for the live chat entered by user
     */
    userlivechange: function (oEvent) {
      const userinp = oEvent.getParameter("value");
      const chatModel = this.getOwnerComponent().getModel("chatModel");
      if (!userinp || userinp == "/n") {
        chatModel.setSubmit(false);
      } else {
        chatModel.setSubmit(true);
      }
    },

    /**
     * Attach Enter Event for chatFeedInput
     * @param {object} controller this
     */
    attachEventchatFeedInput: function (controller) {
      let chatFeedInput = controller.getView().byId("chatFeedInput");
      let chatFeedSubmit = controller.getView().byId("chatFeedSubmit");
      chatFeedInput.attachBrowserEvent("keypress", function (event) {
        if (event.keyCode === 13 && chatFeedInput.getValue().trim() !== "") {
          chatFeedSubmit.firePress();
          chatFeedInput.setValue(null);
          event.preventDefault();
        }
      });
    },

    /**
     * Event handler for the chat entered by user
     * Calls the ai and return aresponse
     * @param {object} oEvent object
     */
    onUserChat: async function (oEvent) {

      const chatModel = this.getOwnerComponent().getModel("chatModel");
      //disable submit button
      chatModel.setSubmit(false);
      chatModel.setbusyIndicator(true);
      chatModel.setvisibleResult(false);

      // Get the user input
      const Feedinp = this.getView().byId("chatFeedInput");
      const sInput = Feedinp.getValue();
      // triggerChat(this, sInput);
      // const sResponse = "";
      
    //   $.ajax({
    //     url: "/api/chat",
    //     type: "POST",
    //     contentType: "application/json",
    //     data: JSON.stringify({ "message": "top 5 earning" }),
    //     success: function (data) {
    //          sResponse = data.result;  // ✅ Store API response in a variable
    //         console.log("API Response:", sResponse);
            
    //         // Optional: Store result in SAPUI5 Model
    //         var oModel = new sap.ui.model.json.JSONModel({ apiResult: sResponse });
    //         sap.ui.getCore().setModel(oModel, "chatModel");
    //     },
    //     error: function (xhr, status, error) {
    //         console.error("API Error:", error);
    //     }
    // });
  
    
      const Resp = "";


      this.onfetchData(sInput).then(resp=> {
          
      chatModel.setbusyIndicator(false);
      chatModel.setvisibleResult(true);
      chatModel.setResult(resp);
   //   chatModel.setbusyIndicator(false);
      Feedinp.setValue(null);
      console.log(resp);


      })

      //  const sResponse =
      //    '<html>\n<body>\n<h2>Top 5 Earning Items Summary</h2>\n\n<table border="1">\n  <tr>\n    <th>Item</th>\n    <th>Revenue (million)</th>\n    <th>Profit before tax (million)</th>\n    <th>Total assets (million)</th>\n  </tr>\n  <tr>\n    <td><strong>1. Total Corporate & Investment Banking</strong></td>\n    <td>$196,823</td>\n    <td>$118,106</td>\n    <td>$363,909</td>\n  </tr>\n  <tr>\n    <td><strong>2. Total Group</strong></td>\n    <td>$420,117</td>\n    <td>$193,115</td>\n    <td>$581,841</td>\n  </tr>\n  <tr>\n    <td><strong>3. Oil & Gas industry</strong></td>\n    <td>$7,421</td>\n    <td>$7,928</td>\n    <td>$21,440</td>\n  </tr>\n  <tr>\n    <td><strong>4. Commercial Real Estate</strong></td>\n    <td>$7,635</td>\n    <td>$2,758</td>\n    <td>$7,677</td>\n  </tr>\n  <tr>\n    <td><strong>5. Power industry</strong></td>\n    <td>$6,341</td>\n    <td>$4,538</td>\n    <td>$10,503</td>\n  </tr>\n</table>\n\n<h3>Key Points:</h3>\n<ul>\n<li>Corporate & Investment Banking and Total Group are the top earners by a significant margin</li>\n<li>Among industries, Oil & Gas, Commercial Real Estate, and Power are the highest earning sectors</li>\n<li>Data is sourced exclusively from non-transcript contexts as required</li>\n<li>Confidence is high for the reported figures, as they come directly from financial tables</li>\n<li>Some contextual information (e.g. year, specific segment breakdowns) is limited in the available non-transcript data</li>\n</ul>\n</body>\n</html>';

    },

    /**
     * Copy the Agent Chat
     * @param {object} oEvent
     */
    onChatCopy: function (oEvent) {
      const oSource = oEvent?.getSource();
      const aItems = oSource?.getParent().getParent().getItems();
      if (aItems?.length > 0 && Array.isArray(aItems)) {
        const message = aItems[0]?.getDomRef()?.innerText;
        if (navigator?.clipboard && message) {
          navigator?.clipboard
            .writeText(message)
            .then(function () {})
            .catch(function (err) {
              console.log("Failed to copy text.");
            });
        }
      }
    },

    onfetchData: async function (sInput) {



      const url = "https://EarningsAIAssistantUI5-noisy-numbat-gk.cfapps.ap11.hana.ondemand.com/api/chat";
  
      try {
          const response = await fetch(url, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ "message": sInput })
          });
  
          if (!response.ok) {
              throw new Error(`HTTP error! Status: ${response.status}`);
          }
  
          const data = await response.json();
          const sResponse = data.result;  // ✅ Store API response in a variable
          console.log("API Response:", sResponse);
          return sResponse;
          
  
          // Optional: Store result in SAPUI5 JSONModel
          // var oModel = new sap.ui.model.json.JSONModel({ apiResult: sResponse });
          // sap.ui.getCore().setModel(oModel, "chatModel");
  
      } catch (error) {
          console.error("API Error:", error);
      }
      
    },


    /**
     * Regenerate the Agent Chat
     * @param {object} oEvent
     * @param {object} controller
     */
    onChatRegenerate: function (oEvent) {
      const chatModel = this.getOwnerComponent().getModel("chatModel");
      const oSource = oEvent?.getSource();
      const userMessage = oSource?.data("userMessage");
      if (userMessage) {
        // triggerChat(this, sInput);
        chatModel.addUserChat(userMessage);
        const sResponse =
          '<html>\n<body>\n<h2>Top 5 Earning Items Summary</h2>\n\n<table border="1">\n  <tr>\n    <th>Item</th>\n    <th>Revenue (million)</th>\n    <th>Profit before tax (million)</th>\n    <th>Total assets (million)</th>\n  </tr>\n  <tr>\n    <td><strong>1. Total Corporate & Investment Banking</strong></td>\n    <td>$196,823</td>\n    <td>$118,106</td>\n    <td>$363,909</td>\n  </tr>\n  <tr>\n    <td><strong>2. Total Group</strong></td>\n    <td>$420,117</td>\n    <td>$193,115</td>\n    <td>$581,841</td>\n  </tr>\n  <tr>\n    <td><strong>3. Oil & Gas industry</strong></td>\n    <td>$7,421</td>\n    <td>$7,928</td>\n    <td>$21,440</td>\n  </tr>\n  <tr>\n    <td><strong>4. Commercial Real Estate</strong></td>\n    <td>$7,635</td>\n    <td>$2,758</td>\n    <td>$7,677</td>\n  </tr>\n  <tr>\n    <td><strong>5. Power industry</strong></td>\n    <td>$6,341</td>\n    <td>$4,538</td>\n    <td>$10,503</td>\n  </tr>\n</table>\n\n<h3>Key Points:</h3>\n<ul>\n<li>Corporate & Investment Banking and Total Group are the top earners by a significant margin</li>\n<li>Among industries, Oil & Gas, Commercial Real Estate, and Power are the highest earning sectors</li>\n<li>Data is sourced exclusively from non-transcript contexts as required</li>\n<li>Confidence is high for the reported figures, as they come directly from financial tables</li>\n<li>Some contextual information (e.g. year, specific segment breakdowns) is limited in the available non-transcript data</li>\n</ul>\n</body>\n</html>';
        chatModel.setResult(sResponse);
      }
    },

    /**
     * Export chat to pdf
     * @param {object} oEvent
     * @param {object} controller
     */
    onChatExport: function (oEvent) {
      const chatModel = this.getOwnerComponent().getModel("chatModel");
      const oSource = oEvent?.getSource();
      const message = oSource?.data("message");
      if (message) {
        const doc = new jsPDF();
        doc.text("Hello world!", 10, 10);
        doc.save("a4.pdf");
      }
    },
  });
});
