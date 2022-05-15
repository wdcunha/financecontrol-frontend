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
