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
    "?$select=new_workexperience&$expand=parentcustomerid_account($select=name)&$filter=parentcustomerid_account/accountid eq " +
      formContext.data.entity.getId()
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
