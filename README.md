![Carey Development Logo](http://careydevelopment.us/img/branding/careydevelopment-logo-sm.png)

# Carey Development Validation for Angular Material Forms 

![license](https://img.shields.io/badge/license-MIT-blue.svg) 


## Overview
This package streamlines validation displays for Angular Material forms.

The point is to reduce the amount of code developers need to add to display validation
errors on forms.

The code handles two types of error displays:
1. **Individual errors** - errors that typically appear next to or below the erroneous field.
2. **Summary errors** - lists that summarize all errors on a form, usually displayed at the top or bottom of the form.

As of now, the package only supports Angular Material forms. 

##Usage: Installation
It's easy to install this package:
```
npm install carey-validation
```

Once you've installed it, you can begin using it as described below.

## Usage: Individual Error Messages
The easiest way to add error display to a form is with the `<mat-error>` element. For example:
```
<mat-error fieldLabel="First name" [simpleValidation]="basicInfoFormGroup.get('firstName')"></mat-error>
```

The `fieldLabel` property is optional but helpful. If used, the error will appear with the field name.
For example: "First name is required."

If you omit the `fieldLabel` property, users will see a generic error message: "This field is required."

The `simpleValidation` takes a form field as its input. It will validate that field according to the
rules you specify in the component class. Yes, you must still specify the validation rules. 

## Usage: Summary Error Messages
If you want to display a summary of error messages use the `<error-spree>` element. For example:
```
<error-spree [errorMessages]="errorMessages"></error-spree>
```

In the code above, `errorMessages` is an array of strings representing all errors on the entire form.

You can get all errors with the help of the `ValidationService` class provided in this package. For example:<br/>
```
let basicInfoForm: FormGroup = basicInfoComponent.basicInfoFormGroup;
let errorMessages: string[] = this.validationService.validateForm(basicInfoForm);
```

That will grab all the errors from that form.

A caveat, though: you need to configure error messages for fields not covered by the package.

As it stands now, the package will provide default messages for fields with the following names:
- firstName
- lastName
- email

If you want to provide messages for other fields, you can add them as an array in the `fieldSummaries`
property of the configuration object.

An example:<br/>
```
export const allFieldSummaries: ErrorFieldMessage[] = [
  {
    field: "source",
    message: "Please enter a valid source"
  },
  {
    field: "status",
    message: "Please enter a valid status"
  },
  {
    field: "account",
    message: "Please enter a valid account"
  }
];
```

Then just specify that array when importing the module as follows:<br/>
`ValidationModule.forRoot({ fieldSummaries : allFieldSummaries })`

