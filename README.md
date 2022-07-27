# Progetto finale Start2Impact

## Live URL

[Clicca qui per provare l'app](https://github.com/davidelng/Progetto-Full-Stack-S2I)

## Descrizione

Il progetto prevede la creazione di un'app Full-Stack che implementi un sistema di autenticazione e delle API REST.

### Cosa ho utilizzato

Front End:

- Angular
- TailwindCSS
- Material Icons

Back End:

- Laravel (API)
- Laravel Sanctum (Autenticazione)
- Laravel Fortify (Login, Registrazione)
- MySQL

### Cosa ho costruito

Ho creato un'applicazione ispirata a social media come Reddit e Twitter, dove un utente può registrarsi e scrivere post.

Grazie alla struttura SPA è possibile visualizzare tutti i contenuti sulla homepage o crearne di nuovi, mentre nel proprio profilo è possibile modificare, cancellare e visualizzare i propri post, nonché visionare i propri dati, limitando le chiamate ajax.

Il sistema di autenticazione utilizza la sessione di PHP e, di conseguenza, i cookie.

Il flusso di navigazione è gestito dall'autenticazione: una volta autenticati è possibile visitare il feed e il proprio profilo, ma non le pagine di login e registrazione. Viceversa, queste due sarnno disponibili senza aver effettuato l'accesso, ma il resto sarà bloccato.

L'app è totalmente responsive e include anche uno switch per il tema chiaro/scuro che, oltre a rispettare la scelta dell'utente, di default si basa sulle preferenze di sistema.

## Implementazioni future

Nice to have:

- Searchbar per filtrare i contenuti
- Controllo del profilo utente (immagine, cambio mail, password e username)
- Bottone "load more" per caricare altri contenuti
- Bottone "to the top"
- Sistema di like/dislike
- Commenti

Da rivedere:

- Controllare tutte le subscribe per eventuali leak
- Design

## Testare il progetto in locale

Clonare il repo, creare un db e settare la variabili d'ambiente sia per Angular che per Laravel. I due framework vanno avviati su porte diverse (default 4200 e 8000) per comunicare in localhost.
