# FinancecontrolFrontend

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

There was an issue about date when saving business and it was hard to solve. First I had to install material-moment-adapter and there was version conflict that was solved using --legacy-peer-deps after the [install command](https://stackoverflow.com/questions/64573177/unable-to-resolve-dependency-tree-error-when-installing-npm-packages). About to convert data in the format, I found solution using [datepipe](https://stackoverflow.com/questions/55721254/how-to-change-mat-datepicker-date-format-to-dd-mm-yyyy-in-simplest-way) and one simple way that use [toISOString](https://www.codegrepper.com/code-examples/javascript/typescript+date+to+string+yyyy-mm-dd) that seems to be the ligther option.


Selecting products in Business was a challange in the meaning of having several lines as many as the amount of products purchased/bought, so the solution was to use FormArray and I found some great examples in stack blitz, actually 2 of them was most valuable for this project: (Angular Form Array In Table)[https://stackblitz.com/edit/angular-form-array-in-table?file=src%2Fapp%2Fapp.component.html,src%2Fapp%2Fuser-table%2Fuser-table.component.html,src%2Fapp%2Fnested-table-from-array%2Fnested-table-from-array.component.ts&file=src%2Fapp%2Fnested-table-from-array%2Fnested-table-from-array.component.html,src%2Fapp%2Fuser-table%2Fuser-table.component.ts] and (Angular Nested Formarray Dynamic Forms)[https://stackblitz.com/edit/angular-nested-formarray-dynamic-forms?file=src%2Fapp%2Fapp.component.ts&file=src%2Fapp%2Fapp.component.html] that has a tutorial (Nested FormArray)[https://www.tektutorialshub.com/angular/nested-formarray-example-add-form-fields-dynamically/], both with a rich content of great usables examples.

Sending BusinessProduct to the Backend has firt to deserialize data from form fields because the form value sent as object and the API waits for array, that' why an array variable was createad to be sent as parameter to the post service.
