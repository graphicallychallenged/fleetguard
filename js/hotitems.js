function hotItemsShoppingCart(shoppingCartPage, prod_oid, prod_index, prod_id) {
    var url = shoppingCartPage;
    var oid = prod_oid;
    var i = document.getElementById('PROD_INDEX' + prod_index);
    var prodname;
    for (var i = 0; i < document.HotProducts.length; i++) {
        if (document.HotProducts.elements[i].id == 'PROD_INDEX' + prod_index) {
            var quantities = document.HotProducts.elements[i - 1].value;
            prodname = document.HotProducts.elements[i + 6].value;

            if (isvalidQty(i - 1, i + 4, i + 2) == false)
                return;

            if (NotDiscontinued(i - 1, i + 5, i + 2) == false)
                return;

        }
    }

    url += "oids=" + oid + "&qties=" + quantities;

    var xmlHttpReq = false;
    var self = this;
    // Mozilla/Safari
    if (window.XMLHttpRequest) {
        self.xmlHttpReq = new XMLHttpRequest();
    }
    // IE
    else if (window.ActiveXObject) {
        self.xmlHttpReq = new ActiveXObject("Microsoft.XMLHTTP");
    }
    self.xmlHttpReq.open('POST', url, true);
    self.xmlHttpReq.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    self.xmlHttpReq.onreadystatechange = function() {
        if (self.xmlHttpReq.readyState == 4) {
            document.getElementById('added-text').innerHTML = '<span class="bluelink1_1" style="font-weight:normal;">' + prod_id + '  ' + prodname + '</span><br /> HAS BEEN ADDED TO YOUR CART.';
            document.getElementById('light').style.display = 'block';
            document.getElementById('fade').style.display = 'block';
            document.getElementById('cartDetails').innerHTML = self.xmlHttpReq.responseText;

            setTimeout(function() {
                document.getElementById('light').style.display = 'none'
            }, 10 * 1000);
            setTimeout(function() {
                document.getElementById('fade').style.display = 'none';
            }, 10 * 1000);

        }
    }
    self.xmlHttpReq.send("");

} //end of function