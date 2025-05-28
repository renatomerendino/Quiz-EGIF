# 🎯 Quiz Interattivo

Un'applicazione web moderna e intuitiva per creare quiz personalizzati a partire da file JSON.

## ✨ Caratteristiche

- **Caricamento File Drag & Drop**: Trascina semplicemente il file JSON nell'area di caricamento
- **Interfaccia Moderna**: Design responsive e animazioni fluide
- **Feedback Immediato**: Mostra subito se la risposta è corretta o errata
- **Spiegazioni Dettagliate**: Ogni domanda include una spiegazione della risposta corretta
- **Barra di Progresso**: Visualizza l'avanzamento nel quiz
- **Risultati Completi**: Statistiche finali con percentuale di successo
- **Riavvio Facile**: Possibilità di rifare il quiz o caricarne uno nuovo

## 🚀 Come Utilizzare

### 1. Preparazione del File JSON

Il file JSON deve avere la seguente struttura:

```json
{
  "questions": [
    {
      "id": 1,
      "question_text": "Testo della domanda",
      "options": [
        { "id": "A", "text": "Prima opzione" },
        { "id": "B", "text": "Seconda opzione" },
        { "id": "C", "text": "Terza opzione" },
        { "id": "D", "text": "Quarta opzione" }
      ],
      "correct_option_id": "B",
      "explanation": "Spiegazione della risposta corretta"
    }
  ]
}
```

### 2. Avvio dell'Applicazione

1. Apri `index.html` nel tuo browser
2. Carica il file JSON trascinandolo nell'area apposita o cliccando "Seleziona File"
3. Clicca "Inizia Quiz" per iniziare
4. Seleziona una risposta per ogni domanda
5. Leggi la spiegazione e procedi alla domanda successiva
6. Visualizza i risultati finali al termine

## 📁 Struttura dei File

```
quiz-app/
├── index.html          # Pagina principale
├── styles.css          # Stili e animazioni
├── script.js           # Logica dell'applicazione
├── quiz_slide_25.json  # Esempio di file quiz
└── README.md           # Documentazione
```

## 🎨 Caratteristiche UX/UI

- **Design Responsive**: Si adatta a tutti i dispositivi
- **Feedback Visivo**: Colori diversi per risposte corrette/errate
- **Animazioni Fluide**: Transizioni smooth tra le sezioni
- **Accessibilità**: Supporto navigazione da tastiera (tasto Invio)
- **Validazione**: Controllo automatico della struttura del file JSON

## 🔧 Funzionalità Tecniche

### Validazione del File JSON
L'applicazione verifica che il file JSON contenga:
- Array `questions`
- Ogni domanda con `id`, `question_text`, `options`, `correct_option_id`, `explanation`
- Esattamente 4 opzioni per domanda
- Ogni opzione con `id` e `text`

### Gestione dello Stato
- Tracciamento delle risposte dell'utente
- Calcolo del punteggio in tempo reale
- Navigazione sequenziale delle domande
- Prevenzione modifiche dopo la risposta

### Risultati e Statistiche
- Percentuale di successo
- Numero di risposte corrette/errate
- Colore dinamico del punteggio basato sulla performance
- Opzioni per riavviare o caricare un nuovo quiz

## 🎯 Utilizzo del File Esempio

Il file `quiz_slide_25.json` contiene un quiz di 10 domande sulle dinamiche gestionali bancarie. È un esempio perfetto per testare l'applicazione.

## 🌐 Compatibilità Browser

- Chrome (versione recente)
- Firefox (versione recente)
- Safari (versione recente)
- Edge (versione recente)

## 💡 Suggerimenti

- Usa domande chiare e specifiche
- Includi spiegazioni dettagliate per aiutare l'apprendimento
- Testa il file JSON prima di utilizzarlo
- Crea opzioni plausibili per aumentare la difficoltà

## 🚀 Avvio Rapido

1. Scarica tutti i file nella stessa cartella
2. Apri `index.html` nel browser
3. Carica `quiz_slide_25.json` per provare l'esempio
4. Inizia il quiz e buono studio! 📚

---

Creato per facilitare l'apprendimento attraverso quiz interattivi e personalizzabili. 