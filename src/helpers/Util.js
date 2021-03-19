//To make custom formatter works on Android have to import intil
import 'intl';
import 'intl/locale-data/jsonp/en'; 

const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
});

const getDate = ()=> {
    return new Date(new Date().toString().split("GMT")[0] + " UTC")
      .toISOString()
      .split(".")[0]
      .replace("T", " ");
  }

export default {
    formatter,
    getDate,
}