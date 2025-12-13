package com.hian.bancojava.controller;

import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.hian.bancojava.model.Conta;
import com.hian.bancojava.service.BancoService;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/auth")
public class AuthController {

    private final BancoService bancoService;

    public AuthController(BancoService bancoService) {
        this.bancoService = bancoService;
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> body) {

        Conta conta = bancoService.buscarConta(body.get("numero"));

        if (conta != null && conta.validarPin(body.get("pin"))) {
            return ResponseEntity.ok(
                Map.of(
                    "ok", true,
                    "conta", Map.of(
                        "numero", conta.getNumero(),
                        "titular", conta.getTitular(),
                        "saldo", conta.getSaldo()
                    )
                )
            );
        }

        return ResponseEntity.status(401).body(
            Map.of(
                "ok", false,
                "mensagem", "Conta ou PIN inválidos"
            )
        );
    }
}
