function associateContactHandler(primaryId) {
  var navigationOptions = {
    target: 2,
    title: "Associate Contact",
    height: 450,
    width: 450,
  };
  var pageInput = {
    pageType: "webresource",
    webresourceName: "new_associateContact",
    data: primaryId,
  };
  Xrm.Navigation.navigateTo(pageInput, navigationOptions).then(
    function success() {},
    function error(error) {
      console.log(error.message);
    }
  );
}

function onSaveContact(executionContext) {
  var formContext = executionContext.getFormContext();
  Xrm.WebApi.retrieveMultipleRecords(
    "contact",
    "?$select=new_workexperience&$expand=parentcustomerid_account($select=name)&$filter=parentcustomerid_account/accountid eq 455c807e-e527-ef11-840a-002248c82767"
  ).then(
    function success(result) {
      console.log(result);
      var sum = 0;
      result.entities.forEach((element) => {
        sum += element.new_workexperience ?? 0;
      });
      formContext.getAttribute("new_experiencetotal").setValue(sum);
    },
    function (error) {
      console.log(error.message);
    }
  );
}

function updateExperienceTotal(accountId, control) {
  Xrm.WebApi.retrieveMultipleRecords(
    "contact",
    "?$select=new_workexperience&$expand=parentcustomerid_account($select=name)&$filter=parentcustomerid_account/accountid eq " +
      accountId[0].slice(1, -1).toLowerCase()
  ).then(
    function success(result) {
      var sum = 0;
      result.entities.forEach((element) => {
        sum += element.new_workexperience ?? 0;
      });
      control.getAttribute("new_experiencetotal").setValue(sum);
    },
    function (error) {
      console.log(error.message);
    }
  );
}

// var findSystemAdministratorRole = function (row, index) {
//   return row.name === "System Administrator";
// };

// function getAdminRoles(context) {
//   return (
//     context?.context?.userSettings?.roles?.get(findSystemAdministratorRole) ??
//     []
//   );
// }

// function setVisibilityOfAccountInformation(formContext, show) {
//   formContext.getControl("name").setVisible(show);
//   formContext.getControl("telephone1").setVisible(show);
//   formContext.getControl("fax").setVisible(show);
//   formContext.getControl("websiteurl").setVisible(show);
//   formContext.getControl("parentaccountid").setVisible(show);
//   formContext.getControl("tickersymbol").setVisible(show);
//   formContext.getControl("tickersymbol").setVisible(show);
// }

// function setDisabledOfAccountInformation(formContext, disabled) {
//   formContext.getControl("name").setDisabled(disabled);
//   formContext.getControl("telephone1").setDisabled(disabled);
//   formContext.getControl("fax").setDisabled(disabled);
//   formContext.getControl("websiteurl").setDisabled(disabled);
//   formContext.getControl("parentaccountid").setDisabled(disabled);
//   formContext.getControl("tickersymbol").setDisabled(disabled);
//   formContext.getControl("tickersymbol").setDisabled(disabled);
// }

// function setRequiredLevelOfAccountInformation(formContext, required) {
//   const requiredValue = required ? "required" : "none";
//   formContext.getAttribute("name").setRequiredLevel(requiredValue);
//   formContext.getAttribute("telephone1").setRequiredLevel(requiredValue);
//   formContext.getAttribute("fax").setRequiredLevel(requiredValue);
//   formContext.getAttribute("websiteurl").setRequiredLevel(requiredValue);
//   formContext.getAttribute("parentaccountid").setRequiredLevel(requiredValue);
//   formContext.getAttribute("tickersymbol").setRequiredLevel(requiredValue);
//   formContext.getAttribute("tickersymbol").setRequiredLevel(requiredValue);
// }

// function onLoadHandler(executionContext) {
//   var formContext = executionContext.getFormContext();
//   formContext
//     .getAttribute("new_state")
//     .setValue(getAdminRoles(formContext).length > 0 ? 1 : 2);
// }
// function onChangeVisibilityHandler(executionContext) {
//   var formContext = executionContext.getFormContext();
//   var visibility = formContext.getAttribute("new_visibility").getValue();
//   var applyToAll = formContext.getAttribute("new_applytoall").getValue();
//   if (visibility === 1 && applyToAll === false) {
//     formContext.getControl("name").setVisible(true);
//   }
//   if (visibility === 2 && applyToAll === false) {
//     formContext.getControl("name").setVisible(false);
//   }
//   if (visibility === 1 && applyToAll === true) {
//     setVisibilityOfAccountInformation(formContext, true);
//   }
//   if (visibility === 2 && applyToAll === true) {
//     setVisibilityOfAccountInformation(formContext, false);
//   }
// }

// function onChangeStateHandler(executionContext) {
//   var formContext = executionContext.getFormContext();
//   var isEnable = formContext.getAttribute("new_state").getValue();
//   var applyToAll = formContext.getAttribute("new_applytoall").getValue();
//   if (isEnable === 1 && applyToAll === false) {
//     formContext.getControl("name").setDisabled(false);
//   }
//   if (isEnable === 2 && applyToAll === false) {
//     formContext.getControl("name").setDisabled(true);
//   }
//   if (isEnable === 1 && applyToAll === true) {
//     setDisabledOfAccountInformation(formContext, false);
//   }
//   if (isEnable === 2 && applyToAll === true) {
//     setDisabledOfAccountInformation(formContext, true);
//   }
// }

// function onChangeRequiredHandler(executionContext) {
//   var formContext = executionContext.getFormContext();
//   console.log(formContext);
//   var isRequired = formContext.getAttribute("new_required").getValue();
//   var applyToAll = formContext.getAttribute("new_applytoall").getValue();
//   if (isRequired === 1 && applyToAll === false) {
//     formContext.getAttribute("name").setRequiredLevel("required");
//   }
//   if (isRequired === 2 && applyToAll === false) {
//     formContext.getAttribute("name").setRequiredLevel("none");
//   }
//   if (isRequired === 1 && applyToAll === true) {
//     setRequiredLevelOfAccountInformation(formContext, true);
//   }
//   if (isRequired === 2 && applyToAll === true) {
//     setRequiredLevelOfAccountInformation(formContext, false);
//   }
// }
