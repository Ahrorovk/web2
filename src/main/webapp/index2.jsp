<%@ page isELIgnored="true" %>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>

<!-- @author ahrorovk -->
<!-- @version 2.0 -->

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>WEB Lab1</title>

    <link rel="stylesheet" href="static/css/v2/normalize.css">
    <link rel="stylesheet" href="static/css/v2/style.css">
</head>
<body>
<div class="container">
    <header>
        <div class="credentials">

            <ul>
                <li>Веб-программирование 2 @ <a href="static/img/img.png" type="image/x-icon">Вариант 77</a></li>
                <li>Выполнил <a href="https://my.itmo.ru/persons/412934">Ахроров Кароматуллохон Фирдавсович</a>
                    @ <a href="https://github.com/ahrorovk">github/Ahrorovk</a></li>
            </ul>
        </div>
    </header>

    <main>
        <table>
            <tr>
                <td>
                    <div class="canvasPlaceholder">
                        <canvas id="graph" width="500" height="500" class="graph"></canvas>
                    </div>
                </td>
                <td>
                    <form id="form" autocomplete="off">
                        <div class="inputPlaceholder">
                            <label for="x" class="fieldName">X:</label><br>
                            <div id="x" class="checkbox-group controlPlaceholder">
                                <input type="checkbox" name="x" id="x-2" value="-2">
                                <label for="x-2">-2</label>
                                <input type="checkbox" name="x" id="x-1.5" value="-1.5">
                                <label for="x-1.5">-1.5</label>
                                <input type="checkbox" name="x" id="x-1" value="-1">
                                <label for="x-1">-1</label>
                                <input type="checkbox" name="x" id="x-0.5" value="-0.5">
                                <label for="x-0.5">-0.5</label>
                                <input type="checkbox" name="x" id="x0" value="0">
                                <label for="x0">0</label>
                                <input type="checkbox" name="x" id="x0.5" value="0.5">
                                <label for="x0.5">0.5</label>
                                <input type="checkbox" name="x" id="x1" value="1">
                                <label for="x1">1</label>
                                <input type="checkbox" name="x" id="x1.5" value="1.5">
                                <label for="x1.5">1.5</label>
                                <input type="checkbox" name="x" id="x2" value="2">
                                <label for="x2">2</label>
                            </div>
                        </div>

                        <div class="inputPlaceholder">
                            <label for="y" class="fieldName">Y:</label><br>
                            <input type="text"
                                   id="y"
                                   name="y"
                                   value="0" min="-5" max="3"
                                   placeholder="&#8722;5 &le; y &le; 3"
                                   step="0.001" required
                                   class="controlPlaceholder">
                        </div>

                        <!-- R Checkbox Group -->
                        <div class="inputPlaceholder">
                            <label for="r" class="fieldName">R:</label><br>
                            <div id="r" class="checkbox-group controlPlaceholder">
                                <input type="checkbox" name="r" id="r1" value="1">
                                <label for="r1">1</label>
                                <input type="checkbox" name="r" id="r2" value="2">
                                <label for="r2">2</label>
                                <input type="checkbox" name="r" id="r3" value="3">
                                <label for="r3">3</label>
                                <input type="checkbox" name="r" id="r4" value="4">
                                <label for="r4">4</label>
                                <input type="checkbox" name="r" id="r5" value="5">
                                <label for="r5">5</label>
                            </div>
                        </div>

                        <button id="submit" type="submit" class="btn-submit"><strong>Отправить</strong></button>
                    </form>
                </td>
            </tr>
        </table>

        <div id="results">
            <h2><strong>~> Результаты<span class="cursor">_</span></strong></h2>
            <table id="resultTable">
                <thead>
                <tr>
                    <th>X</th>
                    <th>Y</th>
                    <th>R</th>
                    <th>Результат</th>
                    <th>Время</th>
                    <th>Время выполнения (нс)</th>
                </tr>
                </thead>
                <tbody>



                </tbody>
            </table>
        </div>
    </main>
</div>

<!-- JS Scripts -->

<script src="static/js/v2/lib/jquery-3.7.1.min.js"></script>
<script type="text/javascript" src="static/js/v2/plot/update.js"></script>
<script type="text/javascript" src="static/js/v2/plot/plot.js"></script>
<script type="text/javascript" src="static/js/v2/net/fetch.js"></script>

<!-- JS Scripts -->

</body>
</html>