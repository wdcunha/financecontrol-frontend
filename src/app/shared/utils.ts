export class Utils {

  static formatYmd = (date: Date) => date.toISOString().slice(0, 10);

  static incrementMonth(date: Date, installment: number): string {
    let day = date.getDate();
    let month = date.getMonth() +1;
    let year = date.getFullYear();

    let monthCompensation =  month.valueOf() + installment;

    // check if number of installments if greater than year remaining
    if(installment > this.remainingYear()) {
      monthCompensation = installment - this.remainingYear();
      year = year +1;
    }

    if(month == 12) {
      monthCompensation = installment;
      year = year +1;
    }

    // check if the month is shorter than the day chosen to payment
    if(day > this.getDaysInMonth(year, monthCompensation)) {
      monthCompensation = monthCompensation +1;
      day = 1;
    }

    let finalMonth = monthCompensation.toString();
    let finalDay = day.toString();
    let finalYear = year.toString();

    if(day < 10) {
      finalDay = `0${finalDay}`;
    }

    if(monthCompensation < 10) {
      finalMonth = `0${finalMonth}`;
    }

    return `${finalYear.toString()}-${finalMonth}-${finalDay}`;
  }

  static remainingYear():number {
    const today = new Date();

    let month = today.getMonth() +1;

    return 12 - month.valueOf();
  }

  static getDaysInMonth(year: number, month: number):number {
    return new Date(year, month, 0).getDate();
  }

  static strToDouble(data: string): number {

    const str: string = data;

    let re = /,/gi;

    let strToDouble: number = +str.replace(re, ".");

    return strToDouble;
  }

}
