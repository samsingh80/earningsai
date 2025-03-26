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
    onUserChat: function (oEvent) {
      const chatModel = this.getOwnerComponent().getModel("chatModel");
      //disable submit button
      chatModel.setSubmit(false);
      // Get the user input
      const Feedinp = this.getView().byId("chatFeedInput");
      const sInput = Feedinp.getValue();
      // triggerChat(this, sInput);
      chatModel.addUserChat(sInput);
      const sResponse =
        '<html>\n<body>\n<h2>Top Earning Results Summary</h2>\n\n<h3>1. JPMorgan Chase & Co.</h3>\n<h4>Full year 2024 results:</h4>\n<table border="1">\n  <tr>\n    <th>Metric</th>\n    <th>Value</th>\n  </tr>\n  <tr>\n    <td>Net income</td>\n    <td>$58.5 billion</td>\n  </tr>\n  <tr>\n    <td>Revenue</td>\n    <td>$180.6 billion</td>\n  </tr>\n  <tr>\n    <td>EPS</td>\n    <td>$19.75</td>\n  </tr>\n  <tr>\n    <td>ROE</td>\n    <td>18%</td>\n  </tr>\n  <tr>\n    <td>ROTCE</td>\n    <td>22%</td>\n  </tr>\n</table>\n\n<h4>Key highlights:</h4>\n<ul>\n<li>Record revenue and net income for 2024</li>\n<li>Strong performance across business segments</li>\n<li>Expect FY2025 net interest income of ~$94 billion</li>\n<li>Expect FY2025 adjusted expense of ~$95 billion</li>\n</ul>\n\n<h3>2. HSBC Holdings plc</h3>\n<h4>Full year 2024 results:</h4>\n<table border="1">\n  <tr>\n    <th>Metric</th>\n    <th>Value</th>\n  </tr>\n  <tr>\n    <td>Profit before tax</td>\n    <td>$32.3 billion</td>\n  </tr>\n  <tr>\n    <td>Revenue</td>\n    <td>$65.9 billion</td>\n  </tr>\n  <tr>\n    <td>Basic EPS</td>\n    <td>$1.25</td>\n  </tr>\n  <tr>\n    <td>ROE</td>\n    <td>14.6%</td>\n  </tr>\n</table>\n\n<h4>Key highlights:</h4>\n<ul>\n<li>Record profit before tax of $32.3 billion</li>\n<li>Targeting mid-teens return on tangible equity for 2025-2027</li>\n<li>$26.9 billion of distributions to shareholders in 2024</li>\n<li>Expect banking NII of around $42 billion for 2025</li>\n</ul>\n\n<h3>3. Standard Chartered PLC</h3>\n<h4>Full year 2024 results:</h4>\n<table border="1">\n  <tr>\n    <th>Metric</th>\n    <th>Value</th>\n  </tr>\n  <tr>\n    <td>Profit before tax</td>\n    <td>$6.8 billion</td>\n  </tr>\n  <tr>\n    <td>Revenue</td>\n    <td>$19.7 billion</td>\n  </tr>\n  <tr>\n    <td>Return on tangible equity</td>\n    <td>11.7%</td>\n  </tr>\n</table>\n\n<h4>Key highlights:</h4>\n<ul>\n<li>Record income of $19.7 billion</li>\n<li>Strong performance in Wealth Solutions and Global Markets</li>\n<li>Full year dividend per share up 37% year-on-year</li>\n<li>Maintaining distribution target of at least $8 billion between 2024-2026</li>\n</ul>\n\n<h3>4. DBS Group Holdings Ltd</h3>\n<h4>Full year 2024 results:</h4>\n<table border="1">\n  <tr>\n    <th>Metric</th>\n    <th>Value</th>\n  </tr>\n  <tr>\n    <td>Net profit</td>\n    <td>$11.3 billion</td>\n  </tr>\n  <tr>\n    <td>Total income</td>\n    <td>$22.3 billion</td>\n  </tr>\n  <tr>\n    <td>ROE (target range)</td>\n    <td>15-17%</td>\n  </tr>\n</table>\n\n<h4>Key highlights:</h4>\n<ul>\n<li>Record full-year income and earnings</li>\n<li>Net profit up 11% to new high</li>\n<li>Commercial book total income up 10%</li>\n<li>Markets trading income up 27%</li>\n</ul>\n\n<p><strong>Note:</strong> Data not available from non-transcript sources for a clear fifth-ranked earning result.</p>\n\n<p><em>Confidence: High for the top 4 results based on comprehensive financial data provided. Unable to determine a clear fifth-ranked result from the available non-transcript data.</em></p>\n</body>\n</html>';
      chatModel.addBotChat(sResponse, sInput);
      Feedinp.setValue(null);
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
          '<html>\n<body>\n<h2>Top Earning Results Summary</h2>\n\n<h3>1. JPMorgan Chase & Co.</h3>\n<h4>Full year 2024 results:</h4>\n<table border="1">\n  <tr>\n    <th>Metric</th>\n    <th>Value</th>\n  </tr>\n  <tr>\n    <td>Net income</td>\n    <td>$58.5 billion</td>\n  </tr>\n  <tr>\n    <td>Revenue</td>\n    <td>$180.6 billion</td>\n  </tr>\n  <tr>\n    <td>EPS</td>\n    <td>$19.75</td>\n  </tr>\n  <tr>\n    <td>ROE</td>\n    <td>18%</td>\n  </tr>\n  <tr>\n    <td>ROTCE</td>\n    <td>22%</td>\n  </tr>\n</table>\n\n<h4>Key highlights:</h4>\n<ul>\n<li>Record revenue and net income for 2024</li>\n<li>Strong performance across business segments</li>\n<li>Expect FY2025 net interest income of ~$94 billion</li>\n<li>Expect FY2025 adjusted expense of ~$95 billion</li>\n</ul>\n\n<h3>2. HSBC Holdings plc</h3>\n<h4>Full year 2024 results:</h4>\n<table border="1">\n  <tr>\n    <th>Metric</th>\n    <th>Value</th>\n  </tr>\n  <tr>\n    <td>Profit before tax</td>\n    <td>$32.3 billion</td>\n  </tr>\n  <tr>\n    <td>Revenue</td>\n    <td>$65.9 billion</td>\n  </tr>\n  <tr>\n    <td>Basic EPS</td>\n    <td>$1.25</td>\n  </tr>\n  <tr>\n    <td>ROE</td>\n    <td>14.6%</td>\n  </tr>\n</table>\n\n<h4>Key highlights:</h4>\n<ul>\n<li>Record profit before tax of $32.3 billion</li>\n<li>Targeting mid-teens return on tangible equity for 2025-2027</li>\n<li>$26.9 billion of distributions to shareholders in 2024</li>\n<li>Expect banking NII of around $42 billion for 2025</li>\n</ul>\n\n<h3>3. Standard Chartered PLC</h3>\n<h4>Full year 2024 results:</h4>\n<table border="1">\n  <tr>\n    <th>Metric</th>\n    <th>Value</th>\n  </tr>\n  <tr>\n    <td>Profit before tax</td>\n    <td>$6.8 billion</td>\n  </tr>\n  <tr>\n    <td>Revenue</td>\n    <td>$19.7 billion</td>\n  </tr>\n  <tr>\n    <td>Return on tangible equity</td>\n    <td>11.7%</td>\n  </tr>\n</table>\n\n<h4>Key highlights:</h4>\n<ul>\n<li>Record income of $19.7 billion</li>\n<li>Strong performance in Wealth Solutions and Global Markets</li>\n<li>Full year dividend per share up 37% year-on-year</li>\n<li>Maintaining distribution target of at least $8 billion between 2024-2026</li>\n</ul>\n\n<h3>4. DBS Group Holdings Ltd</h3>\n<h4>Full year 2024 results:</h4>\n<table border="1">\n  <tr>\n    <th>Metric</th>\n    <th>Value</th>\n  </tr>\n  <tr>\n    <td>Net profit</td>\n    <td>$11.3 billion</td>\n  </tr>\n  <tr>\n    <td>Total income</td>\n    <td>$22.3 billion</td>\n  </tr>\n  <tr>\n    <td>ROE (target range)</td>\n    <td>15-17%</td>\n  </tr>\n</table>\n\n<h4>Key highlights:</h4>\n<ul>\n<li>Record full-year income and earnings</li>\n<li>Net profit up 11% to new high</li>\n<li>Commercial book total income up 10%</li>\n<li>Markets trading income up 27%</li>\n</ul>\n\n<p><strong>Note:</strong> Data not available from non-transcript sources for a clear fifth-ranked earning result.</p>\n\n<p><em>Confidence: High for the top 4 results based on comprehensive financial data provided. Unable to determine a clear fifth-ranked result from the available non-transcript data.</em></p>\n</body>\n</html>';
        chatModel.addBotChat(sResponse, userMessage);
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
