(function($){
    var currentCur = 'MYR';
    var tripsTable = $('#trips-table');
    var fareColHeader = tripsTable.find('thead tr th:nth-child(4)');
    var fareColHeaderSum = fareColHeader.find('.af-faresum');
    if ( fareColHeaderSum.length === 0 ){
    fareColHeaderSum = $('(' + currentCur +'0.00)');
    }
    fareColHeader.append(fareColHeaderSum);
    var fareCol = tripsTable.find('tbody tr td:nth-child(4)');
    var convertCurrencyToNumber = function(value, currency){
    if ( typeof value !== 'string' ){
    return 0.00;
    }
    if ( typeof currency === 'undefined' || currency === '' ){
    currency = 'MYR';
    }
    value = value.trim();
    if ( value === currency + 'NaN' ){
    return 0.00;
    }
    return parseFloat(value.replace(currency, '' ));
    };
    fareCol.each(function(item, i){
    var elem = $(this);
    var checkbox = elem.children('.af-checkwrapper');
    if ( checkbox.length === 0 ){
    checkbox = $('');
    elem.append(checkbox);
    }
    }).promise().done(function(){
    tripsTable.off('change', '.af-checkwrapper input');
    tripsTable.on('change', '.af-checkwrapper input', function(){
    var elem = $(this);
    var elemTd = elem.closest('td');
    var itemText = elemTd.text();
    var itemVal = convertCurrencyToNumber(itemText);
    var currentSumDom = fareColHeaderSum.find('.af-faresumval');
    var currentSumText = currentSumDom.text();
    var currentSumVal = convertCurrencyToNumber(currentSumText);
    if ( elem.prop('checked') ){
    currentSumVal = currentSumVal + itemVal;
    } else {
    currentSumVal = currentSumVal - itemVal;
    }
    currentSumDom.text(currentCur + Number(currentSumVal).toFixed(2));
    });
    });
    })(jQuery);