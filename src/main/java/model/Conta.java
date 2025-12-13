package com.hian.bancojava.model;

public class Conta {

    private String titular;
    private String numero;
    private String pin;
    private double saldo;

    public Conta() {}

    public Conta(String titular, String numero, String pin) {
        this.titular = titular;
        this.numero = numero;
        this.pin = pin;
        this.saldo = 0;
    }

    public String getTitular() {
        return titular;
    }

    public String getNumero() {
        return numero;
    }

    public double getSaldo() {
        return saldo;
    }

    public boolean validarPin(String pin) {
        return this.pin.equals(pin);
    }

    public void depositar(double valor) {
        saldo += valor;
    }

    public boolean sacar(double valor) {
        if (valor > saldo) return false;
        saldo -= valor;
        return true;
    }

    public boolean transferir(Conta destino, double valor) {
        if (sacar(valor)) {
            destino.depositar(valor);
            return true;
        }
        return false;
    }
}
