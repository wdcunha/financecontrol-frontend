# Finance control Frontend

### Sales/Purchase record screen

This screen is compound by 3 components: business, products and payments.

Products has calculation per product by quantity and a total for all typed ones.

Payment types has calculation when blur from Installment field and the result is filled out in Value field and in case to have more than one line, when exit from Value field will calculate the new value if the sugested value has been changed and fill out the next Value field in the new form array

### Sales/Purchase list screen

Here is listed all Sales/Purchase and there's filters that allows the user choose criterias according to his/her needs, but 3 options only: text search (just for value, date and notes), dropdown (for entities) and datepicker (select period and show just occurences for this one).

The table has in its footer the total value of the registers retrieved, which can be changed as the user set filters.

### Technical Information
This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 12.2.5.

Command to generate a model:
```ng g interface models/Type-Person --type=model```

Command to generate components: 
```ng g c components/person```

Table used from the [mat-table examples](https://material.angular.io/components/table/examples) has lots of option like expanded, filter, event, multiple header, foot...

In Purchase Product the challange is to put product in the expanded table because of structure received within Purchase, but an example given in [StackBlitz](https://stackblitz.com/edit/angular-nested-mat-table?file=app%2Ftable-expandable-rows-example.html), gave me the idea of a little detail that was blocking to show data. I found it in a post from stackoverflow about [nested expandable row](https://stackoverflow.com/questions/69189977/angular-11-table-with-two-nested-expandable-rows).

Total Price (totalPrice) comes from backend that is not a field, but a getter that calculate quantity times to price, so initially I put it as product price times to quantity of the purchase-product, so the total came wrong, then it's important to have this in mind that price if from pp, not from product.

Solution was found for formatting BRL currency in a [stackoverflow post](https://stackoverflow.com/questions/38752324/angular-2-formatting-currency-brl-format).


Showing quantity of installments by payment type was chalanging and the solution was from [stackoverflow keyvalue article](https://stackoverflow.com/questions/45819123/how-to-loop-over-object-properties-with-ngfor-in-angular)


Setting default value gave lots of work to be done, because most of solution in the web points to ngModels, but new Angular version doens't support it anymore and many other point to value, but none of them solved the question. The solution was to use set value after getting the component by the FormControlName.

Another issue was when clicking the link in the menu to change from purchase to sell (or vise verse), the dropdown didn't update with the default value, then I noticed that inside route queryParams subscribe the code was updated for lables and then I call the setValue from there for businessType and entities.

There was an issue about date when saving business and it was hard to solve.The solution is to install the version correspondent to 12 that is what is being used here:

```npm i @angular/material-moment-adapter@12.2.13```

It is also necessary to (install moment):

```npm i --save moment@2.29.1```

About to convert date in the format, I found solution using [datepipe](https://stackoverflow.com/questions/55721254/how-to-change-mat-datepicker-date-format-to-dd-mm-yyyy-in-simplest-way) and one simple way that use [toISOString](https://www.codegrepper.com/code-examples/javascript/typescript+date+to+string+yyyy-mm-dd) that seems to be the ligther option.


Selecting products in Business was a challange in the meaning of having several lines as many as the amount of products purchased/bought, so the solution was to use FormArray and I found some great examples in stack blitz, actually 2 of them was most valuable for this project: (Angular Form Array In Table)[https://stackblitz.com/edit/angular-form-array-in-table?file=src%2Fapp%2Fapp.component.html,src%2Fapp%2Fuser-table%2Fuser-table.component.html,src%2Fapp%2Fnested-table-from-array%2Fnested-table-from-array.component.ts&file=src%2Fapp%2Fnested-table-from-array%2Fnested-table-from-array.component.html,src%2Fapp%2Fuser-table%2Fuser-table.component.ts] and (Angular Nested Formarray Dynamic Forms)[https://stackblitz.com/edit/angular-nested-formarray-dynamic-forms?file=src%2Fapp%2Fapp.component.ts&file=src%2Fapp%2Fapp.component.html] that has a tutorial (Nested FormArray)[https://www.tektutorialshub.com/angular/nested-formarray-example-add-form-fields-dynamically/], both with a rich content of great usables examples.

Sending BusinessProduct to the Backend has first to deserialize data from form fields because the form value sent as object and the API waits for array, that's why an array variable was createad within onSubmit method to be sent as parameter to the post service. So it's important to notice that FormArray deliever fields differently, then be aware about the content type is essencial to not have error in the backend that has not much evidence of what is causing it: ```Cannot deserialize value of type `java.util.ArrayList<com.gswf.financecontrol.model.BusinessProduct>` from Object value (token `JsonToken.START_OBJECT`)```, and I found in a post a comment that saved much time of headaches (Error ao usar o post no postman)[https://www.guj.com.br/t/error-ao-usar-o-post-no-postman/422933].

A function used to check the number of month days was found in a page about (getting number of days in month)[https://bobbyhadz.com/blog/javascript-get-number-of-days-in-month].


A tricky error was about a null value for nothesh in business-form when field was empty then saving it got error from backend. It was tried to introduce just a simple if to check if it was equal null, but it didn't work even seeing the value in a console.log, so I found a post in stackoverflow about using double bang (!!)

It's possible to get all element in the form using getRawValue: 

```const teste = this.paymentForm.getRawValue();```
```teste.payments.forEach((x: any) => console.log(x.installment));```

Instead of using the one FormArray:

```(this.paymentForm.controls.payments as FormArray).controls.forEach(x => ```
```console.log(x.installment))```

Error of undefined is something really commum and the solution vary as the case:

```Type 'number | undefined' is not assignable to type 'number'.```
```Type 'undefined' is not assignable to type 'number'.ts(2322)```

Sometimes this error is fixed by putting Number to cast or the bang sign, but in some cases it is not enough, as in business component in method calcTotal that was used 'as a number' and the problem was solved.

When a field has its value shared for other purposes and need to have the value as double type, a solution indicate by Taruga was use currencyMask in the input tag as in the business payment form for Valor and in the business product as well.

An error ocurred when trying to pass as parameter Business result from service an observable, data came from backend, to MatTableDataSource: ```Argument of type Observable is not assignable MatTableDataSource angular```. The solution was subscribe the variable and assign within for the MatTableDataSource variable, as pointed in a post at [stackoverflow](https://stackoverflow.com/a/41819825/11697526).


The entity dropdown filter retrieves entities about save or purchase, but if there's more than one, it would repeat in the dropdown list, so it was necessary to filter distictly and for that, filtering in a array of object was tricky, but an example of [Typescript Distinct Array on stackblitz](https://stackblitz.com/edit/typescript-distinct-array?file=index.ts) solved the problem of removing repeated results.

Yet, for date filter in business list, it was taken from the [datepicker material page](https://material.angular.io/components/datepicker/api) the example of code to load just month and year and moment is used in this implementation.
