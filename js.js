$(document).ready(function () {
    // Função para carregar os dados da tabela a partir do localStorage
    function loadTableData() {
        var pedidos = JSON.parse(localStorage.getItem("pedidos")) || [];

        pedidos.forEach(function (pedido) {
            var newRow = "<tr>" +
                "<td class='data-cell'>" + pedido.nome + "</td>" +
                "<td class='data-cell'>" + pedido.telefone + "</td>" +
                "<td class='data-cell'>" + pedido.data + "</td>" +
                "<td class='data-cell'>" + pedido.nota + "</td>" +
                "<td class='data-cell'>" + pedido.tipo_produto + "</td>" +
                "<td class='data-cell'>" + pedido.tipo_conserto + "</td>" +
                "<td class='data-cell'>" + pedido.dia_entrega + "</td>" +
                "<td class='data-cell'>" + pedido.total_preco + "</td>" +
                "<td class='data-cell'>" + pedido.sinal + "</td>" +
                "<td class='data-cell'>" + pedido.saldo_pagar + "</td>" +
                "</tr>";

            $("#dataTable").append(newRow);
        });
    }

    // Chamada para carregar os dados da tabela ao carregar a página
    loadTableData();

    // Evento de envio do formulário
    $("#pedido-form").submit(function (event) {
        event.preventDefault();

        // Obter valores dos campos do formulário
        var nome = $("#nome").val();
        var telefone = $("#telefone").val();
        var data = $("#data").val();
        var nota = $("#nota").val();
        var tipo_produto = $("#tipo_produto").val();
        var tipo_conserto = $("#tipo_conserto").val();
        var dia_entrega = $("#dia_entrega").val();
        var total_preco = parseFloat($("#total_preco").val());
        var sinal = parseFloat($("#sinal").val());

        // Calcular saldo a pagar
        var saldo_pagar = total_preco - sinal;

        // Criar um objeto com os dados do pedido
        var pedido = {
            nome: nome,
            telefone: telefone,
            data: data,
            nota: nota,
            tipo_produto: tipo_produto,
            tipo_conserto: tipo_conserto,
            dia_entrega: dia_entrega,
            total_preco: total_preco.toFixed(2),
            sinal: sinal.toFixed(2),
            saldo_pagar: saldo_pagar.toFixed(2)
        };

        // Obter os pedidos existentes do localStorage (se houver)
        var pedidos = JSON.parse(localStorage.getItem("pedidos")) || [];

        // Adicionar o novo pedido ao array de pedidos
        pedidos.push(pedido);

        // Salvar o array atualizado de pedidos no localStorage
        localStorage.setItem("pedidos", JSON.stringify(pedidos));

        // Atualizar a tabela com o novo pedido
        var newRow = "<tr>" +
            "<td class='data-cell'>" + pedido.nome + "</td>" +
            "<td class='data-cell'>" + pedido.telefone + "</td>" +
            "<td class='data-cell'>" + pedido.data + "</td>" +
            "<td class='data-cell'>" + pedido.nota + "</td>" +
            "<td class='data-cell'>" + pedido.tipo_produto + "</td>" +
            "<td class='data-cell'>" + pedido.tipo_conserto + "</td>" +
            "<td class='data-cell'>" + pedido.dia_entrega + "</td>" +
            "<td class='data-cell'>" + pedido.total_preco + "</td>" +
            "<td class='data-cell'>" + pedido.sinal + "</td>" +
            "<td class='data-cell'>" + pedido.saldo_pagar + "</td>" +
            "</tr>";

        $("#dataTable").append(newRow);

        // Limpar campos do formulário
        $("#nome").val("");
        $("#telefone").val("");
        $("#data").val("");
        $("#nota").val("");
        $("#tipo_produto").val("");
        $("#tipo_conserto").val("");
        $("#dia_entrega").val("");
        $("#total_preco").val("");
        $("#sinal").val("");
    });

    // Função para buscar na tabela
    function searchTable() {
        var input, filter, table, tr, td, i, txtValue;
        input = document.getElementById("searchInput");
        filter = input.value.toUpperCase();
        table = document.getElementById("dataTable");
        tr = table.getElementsByTagName("tr");
        for (i = 1; i < tr.length; i++) {
            tds = tr[i].getElementsByTagName("td");
            var matchFound = false;
            for (var j = 0; j < tds.length; j++) {
                td = tds[j];
                if (td) {
                    txtValue = td.textContent || td.innerText;
                    if (txtValue.toUpperCase().indexOf(filter) > -1) {
                        matchFound = true;
                        break;
                    }
                }
            }
            if (matchFound) {
                tr[i].style.display = "";
            } else {
                tr[i].style.display = "none";
            }
        }
    }

    // Evento de digitação no campo de busca
    $("#searchInput").on("keyup", searchTable);
});
