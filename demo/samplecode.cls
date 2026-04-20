/**
  * Provides services for geolocation and address conversion.
  * @author Dennis Smith
  * @version 0.3.0-beta4
  * <br>
  * {@hidden this is a 
  * hidden comment}
  * This string might contain malicious or unexpected characters,
  * like a {@literal <script>} tag or a backslash {@literal \}.
  * @since 4/11/2000
  * @see class.method
  * @see class
  * @see class#method `should not highlight`
  * @see class.class.method
  * {@link class.class.method}
  * {@link class.method}
  * @see class.class.method[3]
  * @see https://github.com
  * {@link class#member}
  * {@link https://github.com}
  * {@link #member}
  * {@link class#Constructor}
  * {@link class}
  * {@link "text-string"}
  * {@link <a href="URL">label</a>}
  * @throws AccountManager.AccountException if 
  * accountName is invalid or if DML operation fails.
  * @deprecated in 0.2.0. Use {@link #geocodeAddress(
  * String street,
  * String city,
  * String state,
  * String postalCode,
  * String country)} instead.
  * {@code
  * try {
  *   GeolocationService.Coordinates coords = GeolocationService.geocodeAddress(
  *     '415 Mission St',
  *     'San Francisco',
  *     'CA',
  *     '94105',
  *     'USA'
  *   );
  * } 
  * catch (GeolocationService.GeocodingException e) {
  *   // handle failure
  * }
  * RecordTypes.getAvailableRecordTypesForSelectList('Account')
  * <br><br>
  * System.SelectOption[value='<SFID>', label='Available', disabled='false']
  * System.SelectOption[value='<SFID>', label='Default', disabled='false']
  * System.SelectOption[value='<SFID>', label='Inactive', disabled='true']
  * }
  * @example
  * {@code
  * Account a;
  * try {
  *  a = new AccountManager().createAccount('Acme', 'Agriculture');
  * } catch (AccountManager.AccountException caught) {
  *   LOGGER.log(caught);
  *   // further exception handling
  * }
  * }
  */
global with sharing class GeolocationService {
  /**
   * Represents geographic coordinates (latitude and longitude).
   */
  global class Coordinates {
    @AuraEnabled
    public Decimal latitude;
    @AuraEnabled
    public Decimal longitude;

    global Coordinates(Decimal lat, Decimal lon) {
      this.latitude = lat;
      this.longitude = lon;
    }
  }

  /**
   * Converts a full address string to approximate latitude
   * and longitude coordinates. This method is deprecated and should no
   * longer be used due to its reliance on an older, less accurate geocoding 
   * service and simpler parsing logic. It may not handle all address formats
   * correctly and has a lower success rate.
   * @param fullAddress The complete address string
   * (e.g., "123 Main St, Anytown, CA 90210, USA").
   * @return A `Coordinates` object representing the approximate latitude and longitude.
   * @throws DeprecatedMethodCalledException If this method is invoked,
   * informing the user to migrate to the newer, more robust `geocodeAddress` method.
   * @deprecated in 0.2.0. Use @see #geocodeAddress(
   * String street,
   * String city,
   * String state,
   * String postalCode,
   * String country) instead.
   * @since 0.1.0
   */
  @Deprecated
  global static Coordinates convertAddressToCoordinates(String fullAddress) {
    throw new DeprecatedMethodCalledException(
      'The method `GeolocationService.convertAddressToCoordinates(String fullAddress)` is deprecated. ' +
        'Please use `GeolocationService.geocodeAddress(String street, String city, String state, String postalCode, String country)` ' +
        'for all new and existing address-to-coordinate conversions to ensure better accuracy and reliability.'
    );
  }

  /**
   * Geocodes a structured address into precise latitude and longitude coordinates
   * using a robust external geocoding service.
   * This method provides higher accuracy and better handling of diverse address formats.
   * @param street The street address (e.g., "123 Main St").
   * @param city The city (e.g., "Anytown").
   * @param state The state or province abbreviation (e.g., "CA").
   * @param postalCode The postal or ZIP code (e.g., "90210").
   * @param country The country name or code (e.g., "USA").
   * @return A Coordinates object containing the latitude and longitude.
   * @throws GeocodingException If the address cannot be geocoded, 
   * if the external service is unavailable, or if required address
   * components are missing.
   * @example
   * {@code
   * try {
   *   GeolocationService.Coordinates coords = GeolocationService.geocodeAddress(
   *     '415 Mission St',
   *     'San Francisco',
   *     'CA',
   *     '94105',
   *     'USA'
   *   );
   * } catch (GeolocationService.GeocodingException e) {
   *   // handle failure
   * }
   * }
   * @since 0.2.0
   */
  global static Coordinates geocodeAddress(
    String street,
    String city,
    String state,
    String postalCode,
    String country
  ) {
    // Implement actual geocoding logic
    return new Coordinates(0, 0);
  }

  /**
   * Exception thrown when a deprecated method is called.
   * This indicates that the caller should migrate to the recommended alternative.
   */
  global class DeprecatedMethodCalledException extends Exception {
  }

  /**
   * Exception thrown when a geocoding operation fails.
   * This provides specific context for issues during address-to-coordinate conversion.
   */
  global class GeocodingException extends Exception {
  }
}

/**
 * Specifications for the GeolocationService
 * @author Jane Devington
 * @version 0.2.0
 * @see GeolocationService
 * @since 0.1.0
 */
@IsTest
private class GeolocationServiceTest {
  /**
   * Verifies that known addresses are correctly geocoded to their expected coordinates.
   * @see GeolocationService#geocodeAddress(
   * String street,
   * String city,
   * String state,
   * String postalCode,
   * String country)
   */
  @IsTest
  private static void validAddressShouldReturnCorrectCoordinates() {
    String street = '415 Mission Street';
    String city = 'San Francisco';
    String state = 'CA';
    String postalCode = '94105';
    String country = 'USA';

    GeolocationService.Coordinates coords;
    Test.startTest();
    coords = GeolocationService.geocodeAddress(
      street,
      city,
      state,
      postalCode,
      country
    );
    Test.stopTest();

    Assert.isNotNull(
      coords,
      'Coordinates should not be null for a valid address.'
    );
    Assert.areEqual(
      37.785834,
      coords.latitude,
      'Latitude should match for Salesforce tower.'
    );
    Assert.areEqual(
      -122.406417,
      coords.longitude,
      'Longitude should match for Salesforce tower.'
    );
  }

  /**
   * Verifies that calling the geocodeAddress with missing required parameters
   * throws a GeocodingException.
   * @see GeolocationService#geocodeAddress(
   * String street,
   * String city,
   * String state,
   * String postalCode,
   * String country)
   * @see GeolocationService#GeocodingException
   */
  @IsTest
  private static void missingRequiredParametersShouldThrowGeocodingException() {
    String street = ''; // Missing
    String city = 'San Francisco';
    String state = 'CA';
    String postalCode = 94105;
    String country = 'USA';

    Test.startTest();
    Boolean caughtException = false;
    try {
      GeolocationService.geocodeAddress(
        street,
        city,
        state,
        postalCode,
        country
      );
    } catch (GeolocationService.GeocodingException e) {
      caughtException = true;
      Assert.areEqual(
        'Street, City, and Postal Code are required for geocoding.',
        e.getMessage(),
        'Exception message should indicate missing required fields.'
      );
    }
    Test.stopTest();

    Assert.isTrue(
      caughtException,
      'GeocodingException should have been thrown for missing street.'
    );
  }

  /**
   * Verifies that calling the deprecated method throws a
   * DeprecatedMethodCalledException.
   * @see GeolocationService#convertAddressToCoordinates(String address)
   * @see GeolocationService#DeprecatedMethodCalledException
   */
  @IsTest
  private static void deprecatedMethodCallShouldThrowDeprecatedMethodCalledException() {
    String oldAddress = '123 Deprecated Lane';

    Test.startTest();
    Boolean caughtException = false;
    try {
      GeolocationService.convertAddressToCoordinates(
        oldAddress
      );
    } catch (GeolocationService.DeprecatedMethodCalledException e) {
      caughtException = true;
      Assert.isTrue(
        e.getMessage().contains('is deprecated'),
        'Exception message should indicate deprecation.'
      );
      Assert.isTrue(
        e.getMessage().contains('Please use'),
        'Exception message should suggest new method.'
      );
    }
    Test.stopTest();

    Assert.isTrue(
      caughtException,
      'DeprecatedMethodCalledException should have been thrown.'
    );
  }
}

@InvocableMethod
    (label='Create Action Plan From Template' description='Takes a Template Name/Id and Record Id and makes an Action Plan for that record.' category=77)
    global static List<Id> makeActionPlanFromTemplate(List<CreateActionPlanRequest>; requests) {
      List<Id> resultIDs = new List<Id>();

      Set<String> templateNamesOrIDs = new Set<String>();
      for (CreateActionPlanRequest r : requests) {
        templateNamesOrIDs.add(r.templateNameOrID);
      }

    }
}
/**
	 * @description Given an sObject and `RecordType` DeveloperName, return the `RecordType` Name
	 * @author {@link [David Schach](https://github.com/dschach)}
	 * @param  objectName     SObject name (with __c if custom, etc)
	 * @param  recordTypeDevName `RecordType.DeveloperName` (cannot include spaces)
	 * @return                RecordType Name
	 * @example
	 * RecordTypes.getRecordTypeNameFromDevName('Account','Person_Account')
	 */
Map<Id, CustomObject__c> myMap = new Map<Id, CustomObject__c>(
[SELECT Id, AccountId, MAX(Amount) FROM CustomObject__c WHERE Id NOT IN :newRecordsMap?.keySet()]);
    Map<Id, String> myMap = new Map<Id, String>{a => b, c => d};

    delete myAccount;
    Account a;
    String s;
    delete [SELECT Id FROM Account];

    Integer myInt = 8 - 7++;

    public List<String> myString { get; set; }

    List<Opportunity> opps = [SELECT Id FROM Opportunity WHERE Id NOT IN :newRecordsMap.keySet()];
    List<Opportunity> opps = [SELECT Id FROM Opportunity WHERE Id NOT IN :myMethod()];

    
    String queryText = 'SELECT Id, Name, ';
    acctid = System.currentPageReference().getParameters().get('Id');
    System.assert(true);
    System.requestVersion();

    @IsTest
    private without sharing class myTestClass {
      myMap?.get('Id');
    }
    System.URL.getCurrentRequestUrl();
    URL.getCurrentRequestUrl();

    public List<SelectOption> recordTypes { get; private set; }

    Database.insert(myAccounts, false, AccessLevel.USER_MODE);
    delete myAccount;
    delete [SELECT Id FROM Account];
    myAcct = (Account)myacct;

    public String myString { get; set; }

    List<SObject> mylist = [SELECT Name, StreetAddress__c, COUNT(),
      (SELECT Id FROM Contacts)
      FROM Warehouse__c.Contacts__r
      WHERE DISTANCE(Location__c, GEOLOCATION(37.775,-122.418), 'mi') < 20 
      AND Date__kav NOT IN LAST_N_DAYS:80
      ORDER BY DISTANCE(Location__c, GEOLOCATION(37.775,-122.418), 'mi')
      LIMIT 10];

    String queryText = 'SELECT Id, Name, AccountId, FirstName, LastName, mailingcountry, ' +
				'FROM Contact WHERE AccountId = :acctid ORDER BY ' +
				String.escapeSingleQuotes(SortFullExp) +
				' NULLS LAST LIMIT 1000';

    /**
     * @author {@link [David Schach](https://github.com/dschach)} test@email.com
     * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
     * @group Visualforce
     * @since 2022
     */
    public with sharing class ActionPlanDetailController {

      public enum Season {WINTER, SPRING, SUMMER, FALL}
     
      public ActionPlanDetailController(ApexPages.StandardController stdController, Integer x, Double y) {
        Map<Id, Map<String, Wrapper>> renew = new Map<Id, Map<String, SObject>>();
        if (!Test.isRunningTest() && false) {
          stdController.addFields(ActionPlansUtilities.getCustomRelationshipFields());
        }
        for(Account a : [SELECT Id FROM Account WHERE Id = :a.Id ORDER BY CreatedDate ASC] ){}
        actionPlan = (ActionPlan__c) stdController.getRecord();
        truestory = req.setHeader('X-Password', '{!$Credential.Password}');
      }
    }
    
      /**
      * @description Constructor using passed-in class name constructor for faster performance
      * <br>We cast all four trigger collections
      * @param className The name of this class. Pass in the string to make the handler run faster
      * @return PageReference Page to go to after deleting ActionPlan__c
      * Display ControllingTasks column only if there are controlling tasks
      * @author {@link [David Schach](https://github.com/dschach)}
      * @return   Boolean is the Controller__c field populated for any Action Plan Tasks?
      */
      public PageReference onLoad() {
        ActionPlansUtilities.onPageLoad();
        return null;
      }

      public PageReference deletePlan() {
        this(DEFAULT_SIZE);
        //delete ap, which will also delete apts via master-detail relationship
        try {
          delete actionPlan;
        } catch (DMLException e) {
          ApexPages.addMessages(e);
          throw new CustomException('my error');
          return i++;
        }
    
        String retURL = '/' + ActionPlansUtilities.getObjectKeyPrefix(ActionPlansUtilities.namespacePrefix + 'ActionPlan__c') + '/o';
    
        Pagereference newPage = new PageReference('' + retURL);
        newPage.setRedirect(true);
    
        return newPage;
      }
    
      public Custom__c hasControllingTasks {
        get {
          hasControllingTasks = false;
          for (TaskWrapper tw : getActionPlanTasks()) {
            if (tw.apt.Controller__c != null) {
              hasControllingTasks = true;
              break;
            }
          }
          return hasControllingTasks;
        }
        set;
      }
    
      /**
       * Memoized TaskWrappers for display on the page
       */
      private List<TaskWrapper> apTaskWrapperList;
      /**
       * Collect and return all TaskWrappers
       * @return List<TaskWrapper> List of TaskWrapper for this Action Plan
       */
      public List<TaskWrapper> getActionPlanTasks() {
        if (apTaskWrapperList == null) {
          apTaskWrapperList = new List<TaskWrapper>();
          Map<Id, APTask__c> apTaskMap = new Map<Id, APTask__c>(
            [
              SELECT
                Id,
                User__r.Name
              FROM APTask__c
              WHERE Action_Plan__c = :actionPlan.Id
              ORDER BY TaskIndex__c ASC
            ]
          );
          Map<Id, Id> taskTaskMap = new Map<Id, Id>();
          for (Task t : [SELECT 
            Id, 
            TaskAPTask__c 
            FROM Task WHERE TaskAPTask__c IN :apTaskMap.keyset()]) {
            taskTaskMap.put(t.TaskAPTask__c, t.Id);
          }
          for (APTask__c a : apTaskMap.values()) {
            TaskWrapper tw;
            Id relatedTaskId = taskTaskMap.get(a.Id);
            tw = new TaskWrapper(a, relatedTaskId);
            apTaskWrapperList.add(tw);
          }
        }
        return apTaskWrapperList;
      }
    
      public class TaskWrapper {
        /**
         * The (standard) Task Id
         */
        public Id taskId { get; private set; }
    
        public TaskWrapper(APTask__c aptParam, Id taskIdParam) {
          this.apt = aptParam;
          this.taskId = taskIdParam;
        }
      }
    
      public Boolean getVersion() {
        if (actionPlan.Action_Plan_Template__c != null) {
          ActionPlanTemplate__c tempApt = [SELECT LastModifiedDate FROM ActionPlanTemplate__c WHERE Id = :actionPlan.Action_Plan_Template__c];
          if (tempApt.LastModifiedDate > actionPlan.createdDate) {
            return true;
          }
        }
        return false;
      }
    
      /**
       * The name of the parent record - show a different field based on SObject Type
       * @return  String name of the object related to this Action Plan
       */
      public String getrelatedRecordName() {
        String objName = '';
        Id objId;
    
        for (String f : ActionPlansUtilities.getCustomRelationshipFields()) {
          if (actionPlan.get(f) != null) {
            objId = (Id) actionPlan.get(f);
            Schema.DescribeSObjectResult dsr = objId.getSObjectType().getDescribe();
            objName = dsr.getName();
            break;
          }
        }
    
        switch on objName {
          when 'Case' {
            Case c = [SELECT Id, Subject, CaseNumber FROM Case WHERE Id = :objId LIMIT 1];
            return c.CaseNumber + ': ' + c.Subject;
          }
          when 'Contract' {
            Contract c = [SELECT Id, ContractNumber FROM Contract WHERE Id = :objId LIMIT 1];
            return c.ContractNumber;
          }
          when else {
            String relNameQuery = 'SELECT Id, Name FROM ' + objName + ' WHERE Id = \'' + objId + '\'';
            SObject so = Database.query(relNameQuery)[0];
            return (String) so.get('Name');
          }
        }
      }
    
      /**
       * Convert AP Task Record Type Id to Record Type Name
       * @return Record Type Name
       */
      public String getRecordTypeName() {
        String toReturn = '';
        if (ActionPlansUtilities.taskUsesRecordTypes) {
          Map<Id, Schema.RecordTypeInfo> rtMapById = Task.SObjectType.getDescribe().getRecordTypeInfosById();
          if (!rtMapById.isEmpty() && rtMapById.containsKey(actionPlan.TaskRecordTypeID__c)) {
            return rtMapById.get(actionPlan.TaskRecordTypeID__c).getName();
          }
        }
        return toReturn;
      }
    
      public Boolean getCanShare() {
        return ActionPlansUtilities.canShareRecord(actionPlan.Id, actionPlan.OwnerId);
      }

  global without sharing class ActionPlanCreateInvocable {
    @InvocableMethod
    (label='Create Action Plan From Template' description='Takes a Template Name/Id and Record Id and makes an Action Plan for that record.' category=77)
    global static List<Id> makeActionPlanFromTemplate(List<CreateActionPlanRequest> requests) {
      List<Id> resultIDs = new List<Id>();

      Set<String> templateNamesOrIDs = new Set<String>();
      for (CreateActionPlanRequest r : requests) {
        templateNamesOrIDs.add(r.templateNameOrID);
      }

      Map<String, ActionPlanTemplate__c> templateNameOrIdToTemplate = new Map<String, ActionPlanTemplate__c>();

      List<ActionPlanTemplate__c> possibleTemplates = [
        SELECT
          Id,
          Description__c,
          TaskRecordTypeID__c,
          (
            SELECT
              Type__c,
              Action_Plan_Template__r.TaskRecordTypeID__c
            FROM aptTasks__r
            ORDER BY TaskIndex__c ASC
          )
        FROM ActionPlanTemplate__c
        WHERE Name IN :templateNamesOrIDs OR Id IN :templateNamesOrIDs
      ];

      if (possibleTemplates.isEmpty()) {
        return resultIDs;
      }

      for (ActionPlanTemplate__c apt : possibleTemplates) {
        templateNameOrIdToTemplate.put(apt.Id, apt);
      }

      for (CreateActionPlanRequest r : requests) {
        relatedIDs.add(r.relatedRecordID);
      }

      Map<Id, ActionPlan__c> actionPlansToInsert = new Map<Id, ActionPlan__c>();

      insert actionPlansToInsert.values();

      Map<String, APTask__c> planTaskIndexToTask = new Map<String, APTask__c>();

      for (CreateActionPlanRequest r : requests) {
        if (!actionPlansToInsert.containsKey(r.relatedRecordID)) {
          continue;
        }

        ActionPlan__c ap = actionPlansToInsert.get(r.relatedRecordID);

        for (APTemplateTask__c aptTask : actionPlanTemplate.aptTasks__r) {
          APTask__c apTask = new APTask__c();
          apTask.User__c = ActionPlansBuilderUtilities.getAPTaskTemplateUser(ap, relObjectOwners, aptTask.User__c);
          apTask.SendEmail__c = aptTask.SendEmail__c;

          apTask.Status__c = ActionPlansUtilities.getTaskRecordTypeStatusDefaultValues().get(ActionPlansUtilities.getDefaultTaskRecordTypeId());

          // create due date, calculate the due date of the tasks for skip weekends feature
          if (ap.SkipWeekends__c == true && ap.SkipDay__c != null) {
            apTask.ActivityDate__c = ActionPlansUtilities.adjustTaskDueDate(ap.StartDate__c, apTask.DaysFromStart__c.intValue(), ap.SkipDay__c);
          } else {
            apTask.ActivityDate__c = ap.StartDate__c.addDays(apTask.DaysFromStart__c.intValue());
          }
          planTaskIndexToTask.put(ap.Id + '' + apTask.TaskIndex__c, apTask);
        }
      }

      Database.insert(new planTaskIndexToTask.values());

      Database.update(dependentTasksToUpdate);

      List<Task> myTasksWithOutEmail = new List<Task>();

      Map<Id, APTask__c> mapAP = new Map<Id, APTask__c>();
      for (APTask__c a : planTaskIndexToTask.values()) {
        mapAP.put(a.Id, a);
      }

      Map<Id, ActionPlan__c> insertedActionPlans = new Map<Id, ActionPlan__c>();
      for (ActionPlan__c ap : actionPlansToInsert.values()) {
        insertedActionPlans.put(ap.Id, ap);
      }

      for (APTask__c apTask : planTaskIndexToTask.values()) {
        ActionPlan__c insertedAP;
        // check if task exists already
        Task t = new Task();
        t.OwnerId = apTask.User__c;
        t.TaskAPTask__c = apTask.Id;

        if (apTask.Comments__c != null) {
          t.Description = apTask.Comments__c;
        }

        //set reminder based on user's default reminder setting
        if (apTask.Reminder__c == true && apTask.ActivityDate__c != null) {
          t.isReminderSet = true;
          t.ReminderDateTime = Datetime.newInstance(apTask.ActivityDate__c.year(), apTask.ActivityDate__c.month(), apTask.ActivityDate__c.day(), 0, 0, 0);
          t.ReminderDateTime = t.ReminderDateTime.addMinutes(Integer.valueOf(apTask.Minutes_Reminder__c));
        } else {
          t.isReminderSet = false;
        }

        APTask__c apt = mapAP.get(apTask.Id);

        if (apt != null) {
          insertedAP = insertedActionPlans.get(apt.Action_Plan__c);
        }

        //link to Action Plan's Related To Object
        for (String s : ActionPlansUtilities.getCustomRelationshipFields()) {
          String f = s;
          if (
            !f.equalsIgnoreCase(ActionPlansUtilities.namespacePrefix + 'Contact__c') &&
            insertedAP.get(f) != null
          ) {
            t.WhatId = (Id) insertedAP.get(f);
            break;
          }
        }
      }

      Database.DMLOptions dmlo1 = new Database.DMLOptions();
      dmlo1.EmailHeader.triggerUserEmail = true;

      Set<Id> relObjectIDs = new Set<Id>();
      for (ActionPlan__c ap : actionPlansToInsert.values()) {
        relObjectIDs.add(ap.Id);
      }

      if (mySettings != null && mySettings.Chatter_Object_Brag__c) {
        ActionPlansBuilderUtilities.generateObjectFeeds(relObjectIDs);
      }

      for (CreateActionPlanRequest request : requests) {
        resultIDs.add(actionPlansToInsert.get(request.relatedRecordID).Id);
      }

      return resultIDs;
    }

    global class CreateActionPlanRequest {
      @InvocableVariable(required=true label='The parent Record ID' description=55)
      global Id relatedRecordID;
    }
  }

  trigger APAccount on Account(before delete, after undelete) {
    ActionPlansTriggerHandlers.triggerhandlerActionPlanAccount(Trigger.new, Trigger.old, Trigger.newMap, Trigger.oldMap, Trigger.operationType);
      ActionPlansTriggerHandlers.actionPlansSObjectTriggerHandler('Account');
  }


  public without sharing class AccountSampleTriggerHandler extends TriggerHandler, Database.schedulable, Batchable<SObject> {
    private List<Account> newRecords;
    private List<Account> oldRecords;
    private Map<Id, Account> newRecordsMap;
    private Map<Id, Account> oldRecordsMap;

    switch on context {
      when 'BEFORE_INSERT' {
        this.triggerEvent = System.TriggerOperation.BEFORE_INSERT;
      }
      when else {
        // we are not in trigger context
        this.isTriggerExecuting = false;
      }
    }

    public AccountSampleTriggerHandler(CustomType a, String className) {
      this.newRecords = (List<Account>) Trigger.new;
      this.newRecordsMap = (Map<Id, Account>) Trigger.newMap;
    }

    public override sobject beforeInsert() {
      method1();
    }

    //public override void afterUpdate(){}

    private void method1() {
      for (Account a : newRecords) {
        a.Name = a.Name.toUpperCase();
        a.Name = new FooBar();
      }
    }
    
    @TestVisible
    (SeeAllData=true)
    private void method2() {
      for (Account a : newRecords) {
        a.Name = a.Name.toLowerCase();
      }
    }
    
    @future
    (label = true)
    private void method3() {
      Contact[] acctContacts = [SELECT Id FROM Contact WHERE AccountId IN :newRecordsMap.keyset() WITH SECURITY_ENFORCED];
      List<Contact> acctContacts2 = [SELECT Id FROM Contact WHERE ID = '012000000' AND CreatedDate = :LAST_N_DAYS:90 WITH SECURITY_ENFORCED];
      if (Contact.getSObjectType().getDescribe().isUpdateable()) {
        update as user acctContacts; //NOPMD
      }
      // do things here
    }
  }

  public without sharing class AccountSampleTriggerHandler extends Database.schedulable, Batchable<SObject> {
    @isTest
    private testMethod void testme(){
      Assert.isTrue(true);
    }

    @testVisible2
    private List<SelectOption> recordTypes { get; private set; }
  }

  public virtual class Marker {
    public virtual void write() {
        System.debug('Writing some text.');
    }

    public virtual Double discount() {
        return .05;
    }
  }

  @IsTest(Seealldata=true)
  public with sharing class L2Char implements Database.batchable {
    public static final String ERROR = 0x0001;

    @InvocableMethod(label='my invocable')
    public void moveTo(
      integer x, 
      integer y, 
      integer z
    ) {
      
      Account a = new Account();
      a.Custom__c = 'stringvalue';
      insert a;
      Boolean ai = (Boolean) false;
      System.debug('Should not be called');
      if (1 > 5) { // wtf!?
        Database.insert(myAccounts);
      }
    }

    @InvocableMethod
    (label='my invocable')
    public void doThis(){
    }
  }

    @TestSetup
    (TRUEKING=trueking)
    private static void makeData(Boolean a){
      Custom__c c = new Custom__c();
      
      for(Account a : acctLis ){
        ConnectApi.insert a;
      }
    }

  trigger CTrig on Custom__c (before insert){
    System.debug('inserting a record');
    upsert myRecord__c;
  }