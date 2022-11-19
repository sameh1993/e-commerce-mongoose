paypals.minicarts.render(); //use only unique class names other than paypals.minicarts.Also Replace same class name in css and minicart.min.js

paypals.minicarts.cart.on("checkout", function (evt) {
  var items = this.items(),
    len = items.length,
    total = 0,
    i;

  // Count the number of each item in the cart
  for (i = 0; i < len; i++) {
    total += items[i].get("quantity");
  }

  //   if (total < 3) {
  //     alert(
  //       "The minimum order quantity is 3. Please add more to your shopping cart before checking out"
  //     );
  //     evt.preventDefault();
  //   }
});

const products = paypals.minicarts.cart.items();
const container = $(".render-products");
const initialValue = 0;
const sumWithInitial = products.reduce((previousValue, currentValue) => {
  return (
    previousValue._amount -
    previousValue._discount +
    (currentValue._amount - currentValue._discount)
  );
});
console.log(sumWithInitial, "price");
const productCount = products.length;
$(".product-count").html(`${products.length} products`);

console.log(products);

for (let [index, item] of products.entries()) {
  //   container.append(`
  //         <tr> ${index} + ${item} </tr>
  //     `);
  console.log(item);
  container.append(`
  <tr class="rem1">
  <td class="invert"> ${index + 1}</td>
  <td class="invert"> ${item._data.item_name} </td>
  <td class="invert">
    <div class="quantity">
      <div class="quantity-select">
        <div class="entry value-minus">&nbsp;</div>
        <div class="entry value">
          <span> ${item._data.quantity} </span>
        </div>
        <div class="entry value-plus active">&nbsp;</div>
      </div>
    </div>
  </td>
  <td class="invert">${item._total}</td>
  <td class="invert">
    <div class="rem">
      <div class="close1"></div>
    </div>
  </td>
</tr>
  `);
}
