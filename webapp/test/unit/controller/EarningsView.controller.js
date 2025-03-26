/*global QUnit*/

sap.ui.define([
	"earningsai/controller/EarningsView.controller"
], function (Controller) {
	"use strict";

	QUnit.module("EarningsView Controller");

	QUnit.test("I should test the EarningsView controller", function (assert) {
		var oAppController = new Controller();
		oAppController.onInit();
		assert.ok(oAppController);
	});

});
