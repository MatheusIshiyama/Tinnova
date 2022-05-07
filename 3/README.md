## 3 - Fatorial

Faça um programa que calcule o fatorial de um número qualquer.

Vamos lembrar o que é fatorial?

Seja n um número natural, tal que n >= 2, chama-se fatorial de n o produto de todos os números naturais consecutivos de n até 1.

Por exemplo:

```
5! = 1 * 2 * 3 * 4 * 5 = 120
```

Veja mais alguns resultados e que você pode utilizar como testes:

```
0! = 1
1! = 1
2! = 2
3! = 6
4! = 24
5! = 120
6! = 720
```

Atende que 0! = 1 porque o produto vazio (produto de nenhum número) é 1.

```
  fatorial(n) => 1  se n = 0
  fatorial(n) => n * fatorial(n - 1)  se n > 0
```

---

Para executar o script, é necessário ter instalado o Node.js e utitlizar o comando

```
npm run start
```
