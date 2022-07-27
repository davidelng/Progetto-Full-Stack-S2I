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

Grazie alla struttura SPA è possibile visualizzare tutti i contenuti sulla homepage o crearne di nuovi, mentre nel proprio profilo è possibile modificare, cancellare e visualizzare i propri post, nonché visionare i propri dati personali. Ogni post mostra anche data di creazione o modifica, insieme ad autore e contenuto. Vengono limitate le chiamate asincrone sfruttando gli strumenti di Angular e RxJS come Reactive Forms, Behavior Subjects ed Event Emitter.

Non meno importante, TypeScript è stato implementato in modo approfondito per controllare ogni tipo di dato che sia in chiamata o risposta, in modo da non dover utilizzare variabili "any", con l'ausilio anche di tipi e interfacce custom. Inoltre, mentre i componenti si preoccupano di mostrare suddetti dati, tutta la logica di business è affidata ai servizi.

Il sistema di autenticazione utilizza la sessione di PHP e, di conseguenza, i cookie. Per primo viene impostato un cookie cross-site che il client Http di Angular attacca automaticamente a tutte le richieste future. In seguito si autentica l'utente e, in fase di logout, si invalidano i cookie.

Il flusso di navigazione è gestito dall'autenticazione: una volta autenticati è possibile visitare il feed e il proprio profilo, ma non le pagine di login e registrazione. Viceversa, queste due sarnno disponibili senza aver effettuato l'accesso, ma il resto sarà bloccato.

Il database è stato interamente gestito attraverso Laravel grazie agli strumenti di migrazione e query building, sfruttando Controllers e Models.

L'app è totalmente responsive e include anche uno switch per il tema chiaro/scuro che, oltre a rispettare la scelta dell'utente, di default si basa sulle preferenze di sistema. Il design è moderno, semplice ed è stato ampiamente ispirato dagli strumenti che TailwindCSS mette a disposizione. Non mancano feedback all'utente nei form e nelle pagine.

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
