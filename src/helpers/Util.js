//To make custom formatter works on Android have to import intil
import 'intl';
import 'intl/locale-data/jsonp/en'; 

const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
});

export default {
    formatter
}