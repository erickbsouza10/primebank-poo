package com.hian.bancojava.controller;

import java.util.Collection;
import java.util.Map;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.hian.bancojava.model.Conta;
import com.hian.bancojava.service.BancoService;

@RestController
@RequestMapping("/contas")
public class BancoController {

    private final BancoService service;

    public BancoController(BancoService service) {
        this.service = service;
    }

    // CRIAR CONTA
    @PostMapping("/criar")
    public Conta criarConta(@RequestBody Map<String, String> body) {
        return service.criarConta(
                body.get("titular"),
                body.get("numero"),
                body.get("pin")
        );
    }

    // LISTAR CONTAS
    @GetMapping
    public Collection<Conta> listar() {
        return service.listarContas().values();
    }

    // BUSCAR CONTA
    @GetMapping("/{numero}")
    public Conta buscar(@PathVariable String numero) {
        return service.buscarConta(numero);
    }

    // TRANSFERIR
    @PostMapping("/transferir")
    public Map<String, Object> transferir(@RequestBody Map<String, Object> body) {

        String origem = body.get("origem").toString();
        String destino = body.get("destino").toString();
        double valor = Double.parseDouble(body.get("valor").toString());

        boolean ok = service.transferir(origem, destino, valor);

        if (ok) {
            return Map.of(
                "ok", true,
                "mensagem", "Transferência realizada com sucesso"
            );
        }

        return Map.of(
            "ok", false,
            "mensagem", "Falha na transferência"
        );
    }
    @PostMapping("/depositar")
    public Map<String, Object> depositar(@RequestBody Map<String, Object> body) {

        String numero = body.get("numero").toString();
        double valor = Double.parseDouble(body.get("valor").toString());

        Conta conta = service.depositar(numero, valor);

        if (conta != null) {
            return Map.of(
                "ok", true,
                "saldo", conta.getSaldo()
            );
        }

        return Map.of(
            "ok", false,
            "mensagem", "Conta não encontrada"
        );
    }

}
