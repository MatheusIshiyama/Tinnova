## 2 - Algoritmo de ordenação Bubble Sort

Imagine o seguinte vetor

```
  v = [5, 3, 2, 4, 7, 1, 0, 6]
```

Faça um algoritmo que ordene o vetor utilizando o Bubble Sort

O Bubble Sort ordena de par em par. Ele pega os dois primeiros elementos e pergunta se o primeiro é maior que o segundo. Se sim, os elementos são trocados (swap), se não, são mantidos. Vai se repetindo o processo até o final do vetor

Obviamente que ele não consegue ordernar todo o vetor em uma única rodada, ele terá que passar pelo vetor um certo número de vezes.

De maneira que podemos destacar:

1. Percorra o vetor inteiro comparando elementos adjacentes (dois a dois)
2. Troque as posições dos elementos se eles estiverem fora de ordem
3. Repita os dois passos acima (n -1) vezes, onde n é igual o tamanho do vetor

Ok, vamos fazer um exemplo para facilitar o entendimento.

Voltemos ao nosso vetor

```
  v = [5, 3, 2, 4, 7, 1, 0, 6]
```

Sabemos que iremos repetir o vetor n - 1 vezes. O tamanho do vetor é 8, logo iremos repetir 7 vezes o vetor (8 -1).

Vamos chamar cada repetição de iteração.

Então, na primeira iteração, pegamos os dois primeiros valores e trocamos se estiverem fora de ordem:

```
(5  3) 2 4 7 1 0 6    pegamos o primeiro par
 5--3  2 4 7 1 0 6    trocamos

 3 (5  2) 4 7 1 0 6   pegamos o próximo par
 3  2--5  4 7 1 0 6   trocamos

 3 2 (5  4) 7 1 0 6   pegamos o próximo par
 3 2  4--5  7 1 0 6   trocamos

 3 2 4 (5  7) 1 0 6   pegamos o próximo par
 3 2 4  5--7  1 0 6   mantemos <---

 3 2 4 5 (7  1) 0 6   pegamos o próximo par
 3 2 4 5  1--7  0 6   trocamos

 3 2 4 5 1 (7  0) 6   pegamos o próximo par
 3 2 4 5 1  0--7  6   trocamos

 3 2 4 5 1 0 (7  6)   pegamos o próximo par
 3 2 4 5 1 0  6--7    trocamos
```

Chegamos ao fim da primeira iteração e, como dito, não foi suficiente para ordenar o vetor.

Teremos que reiniciar, só que agora sabemos que, pelo menos, o último valor (7) já está em seu devido lugar.

Então iremos marcá-lo e não precisaremos percorrer todo o vetor na segunda iteração.

```
 3 2 4 5 1 0 6 [7]
```

Esse detalhe é importante e fará toda a diferença no entendimento do algoritmo.

Todo esse processo se repetirá até que todos os itens estejam devidamente ordenados.

---

Para executar o script, é necessário ter instalado o Node.js e utitlizar o comando

```
npm run start
```
