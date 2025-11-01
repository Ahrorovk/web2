$(document).ready(function () {
    let selectedR = [];
    const yInput = $("#y");
    const insert = $('#resultTable tbody');
    const canvas = document.getElementById('graph');

    // === Обработка клика по графику ===
    canvas.addEventListener('click', function (event) {
        const rect = canvas.getBoundingClientRect();
        const rectX = event.clientX - rect.left;
        const rectY = event.clientY - rect.top;

        // Берем первое выбранное значение R
        const rValue = selectedR.length > 0 ? selectedR[0] : null;

        if (!rValue) {
            alert('Выберите хотя бы одно значение R перед кликом по графику');
            return;
        }

        let realX = (rectX - canvas.width / 2) / (canvas.width / 2) * rValue;
        let realY = (canvas.height / 2 - rectY) / (canvas.height / 2) * rValue;

        const constrX = applyXConstraints(realX);
        const constrY = applyYConstraints(realY);

        $.ajax({
            url: `controller?x=${constrX}&y=${constrY}&r=${rValue}&format=params`,
            type: 'POST',
            contentType: 'text/html',
            success: function (data) {
                insertPoint(constrX, constrY, rValue);
                insert.prepend(data);
            },
            error: function () {
                alert('Ошибка при отправке данных');
            }
        });
    });

    // === Функции ограничений ===
    function applyXConstraints(x) {
        const possibleXValues = [-2, -1.5, -1, -0.5, 0, 0.5, 1, 1.5, 2];
        return possibleXValues.reduce((prev, curr) =>
            Math.abs(curr - x) < Math.abs(prev - x) ? curr : prev
        );
    }

    function applyYConstraints(y) {
        if (y < -5) return -5;
        if (y > 3) return 3;
        return y;
    }

    // === Установка значений по умолчанию ===
    setDefaults();

    function setDefaults() {
        $('input[name="x"][value="0"]').prop('checked', true);
        $('#y').val(0);
        $('input[name="r"][value="1"]').prop('checked', true);
        selectedR = [1];
        refresh(1);
    }

    // === Обработка выбора R ===
    $('input[name="r"]').on('change', function () {
        selectedR = $('input[name="r"]:checked').map(function () {
            return parseFloat($(this).val());
        }).get();

        if (selectedR.length > 0) {
            // Обновляем график по последнему выбранному R
            const lastR = selectedR[selectedR.length - 1];
            refresh(lastR);
        }
    });

    // === Проверка и форматирование Y ===
    yInput.on('input', function () {
        yInput.val(yInput.val().replace(/[^0-9.,-]/g, ''));
        yInput.val(yInput.val().replace(/,/g, '.'));

        if (yInput.val() && (parseFloat(yInput.val()) < -5 || parseFloat(yInput.val()) > 3)) {
            yInput.val(parseFloat(yInput.val()) > 3 ? 3 : -5);
        }

        if (yInput.val().indexOf('.') !== -1 && yInput.val().split('.')[1].length > 3) {
            yInput.val(yInput.val().substring(0, yInput.val().indexOf('.') + 4));
        }

        if ((yInput.val().match(/\./g) || []).length > 1) {
            yInput.val(yInput.val().substring(0, yInput.val().lastIndexOf('.')));
        }

        if ((yInput.val().match(/\./g) || []).length === 1 && yInput.val().indexOf('.') === 0) {
            yInput.val('0' + yInput.val());
        }
    });
});
