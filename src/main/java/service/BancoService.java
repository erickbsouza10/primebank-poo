package com.hian.bancojava.service;

import java.util.HashMap;
import java.util.Map;

import org.springframework.stereotype.Service;

import com.hian.bancojava.model.Conta;

@Service
public class BancoService {

    private final Map<String, Conta> contas = new HashMap<>();

    public Conta criarConta(String titular, String numero, String pin) {
        Conta conta = new Conta(titular, numero, pin);
        contas.put(numero, conta);
        return conta;
    }

    public Conta buscarConta(String numero) {
        return contas.get(numero);
    }

    public Map<String, Conta> listarContas() {
        return contas;
    }

    public Conta depositar(String numero, double valor) {
        Conta conta = buscarConta(numero);
        if (conta == null) return null;
        conta.depositar(valor);
        return conta;
    }

    public Conta sacar(String numero, double valor) {
        Conta conta = buscarConta(numero);
        if (conta == null) return null;
        return conta.sacar(valor) ? conta : null;
    }

    public boolean transferir(String origem, String destino, double valor) {
        Conta c1 = buscarConta(origem);
        Conta c2 = buscarConta(destino);
        if (c1 == null || c2 == null) return false;
        return c1.transferir(c2, valor);
    }
}
