
export class UtilsMethods{


  static getDateformat(date : Date){
    var date = new Date(date);
    var month = this.pad2(date.getMonth()+1);//months (0-11)
    var day = this.pad2(date.getDate());//day (1-31)
    var year= date.getFullYear();

    var formattedDate =  day+"-"+month+"-"+year;

    return formattedDate
  }

  private static pad2(n : number) {
    return (n < 10 ? '0' : '') + n;
  }
}
