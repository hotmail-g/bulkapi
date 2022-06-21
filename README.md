## Connect to SFDC and perform Bulk API operations

### Install
```
npm install @gauravtrivedi/sf-bulkapi -g
```

### Usage: 
```
sf-bulkapi -q "SELECT Id, LastName, CustomField__c FROM Contact" -o query
```

Options:
```
  -V, --version              output the version number
  -p, --production           login to production
  -u, --user-name <value>    salesforce instance user name or alias, if already defined, the Salesforce instance
  -o, --operation <type>     (Required) dml operation, like:
                                        Insert, Update, Delete, Upsert, HardDelete and Query
  -q, --soql <type>          SOQL Query, required if operation is query.
  -so, --object-name <type>  API Name of sObject, required if operation is other than query.
  -l, --line-ending <type>   Line Ending of CSV file default is CRLF. Can be changed to LF only. (default: "CRLF")
  -f, --file <type>          file path like "data/contact.csv", required if operation is update, insert, delete, upsert and harddelete
  -k, --sort-key <type>      Filed API name or column name to sort the data for batch processing
  -h, --help                 display help for command

  Examples:

  To get help:
    $ sf-bulkapi --help
    $ sf-bulkapi -h

  Login to already authentacted Salesforce instance and using query operation:
    $ sf-bulkapi -u sf_instance_alias -q "SELECT Id, LastName, CustomField__c FROM Contact" -o query

  Login to Salesforce production and using query operation:
    $ sf-bulkapi -p -q "SELECT Id, LastName, CustomField__c FROM Contact" -o query

  Login to Salesforce sandbox instance:
    $ sf-bulkapi -q "SELECT Id, LastName, CustomField__c FROM Contact" -o query

  DML operation in sandbox, id field is required in csv file:
    $ sf-bulkapi -o update -f data/contact.csv -so Account
```