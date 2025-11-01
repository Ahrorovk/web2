$(document).ready(function() {
    const y = $('#y');
    const form = $('#form');
    const insert = $('#resultTable tbody');
    const canvas = $('#graph');

    form.on('submit', function (event) {
        event.preventDefault();

        // Собираем все выбранные X
        const xValues = $('input[name="x"]:checked').map(function() {
            return parseFloat($(this).val());
        }).get();

        // Собираем все выбранные R
        const rValues = $('input[name="r"]:checked').map(function() {
            return parseFloat($(this).val());
        }).get();

        const yValue = parseFloat(y.val());

        if (xValues.length === 0) {
            alert('Пожалуйста, выберите хотя бы одно значение X');
            return;
        }

        if (rValues.length === 0) {
            alert('Пожалуйста, выберите хотя бы одно значение R');
            return;
        }

        // Перебираем все комбинации X и R
        xValues.forEach(function(x) {
            rValues.forEach(function(r) {
                $.ajax({
                    url: `controller?x=${x}&y=${yValue}&r=${r}&format=params`,
                    type: 'POST',
                    contentType: 'text/html',
                    success: function (data) {
                        insertPoint(x, yValue, r); // добавление точки на график
                        insert.prepend(data); // добавление строки в таблицу
                    },
                    error: function () {
                        alert('Ошибка при отправке данных');
                    }
                });

                refresh(r);
            });
        });
    });

    // Обработка кликов по canvas
    canvas.on('click', function(event) {
        const rect = this.getBoundingClientRect();
        const canvasX = event.clientX - rect.left;
        const canvasY = event.clientY - rect.top;

        // Преобразование координат в систему графика
        const rValue = parseFloat($('input[name="r"]:checked').first().val());
        if (!rValue) {
            alert('Выберите значение R перед кликом по графику');
            return;
        }

        const x = (canvasX - this.width / 2) / (config.radius / rValue);
        const y = (this.height / 2 - canvasY) / (config.radius / rValue);

        $.ajax({
            url: `controller?x=${x.toFixed(2)}&y=${y.toFixed(2)}&r=${rValue}&format=params`,
            type: 'POST',
            contentType: 'text/html',
            success: function (data) {
                insertPoint(x, y, rValue);
                insert.prepend(data);
            },
            error: function () {
                alert('Ошибка при отправке точки');
            }
        });
    });
});
