# Getting Started

## Installation des dependences
```
npm Install
```
## Base de donnée

### Création de la base
```
npx sequelize-cli db:create
```

### Lancement des migrations 
```
npx sequelize-cli db:migrate
```

### Generation de donnée dans la base
```
npx sequelize-cli db:seed:all
```

## Lancement de l'api 
```
npm run dev
```

## Documentation de l'api

### Users
#### Create
Route : ```localhost:6500/api/v1/user/create```

Attendus :

```
{
    username: Nom d'utilisateur, (optionnel)
    first_name: Prénom de l'utilisateur,
    last_name: Nom de l'utilisateur,
    email: Email de l'utilisateur,
    password: Mot de passe de l'utilisateur
}
```

#### Update
Route : ```localhost:6500/api/v1/user/update/:id```

Met a jour l'update avec les champs suivant (tous optionnel sur un update)

```
{
    username: Nom d'utilisateur, 
    first_name: Prénom de l'utilisateur,
    last_name: Nom de l'utilisateur,
    email: Email de l'utilisateur,
    password: Mot de passe de l'utilisateur
}
```

#### GetAll
Route : ```localhost:6500/api/v1/user/find-all```

Retourne :

- Tout les utilisateurs

#### GetById
Route : ```localhost:6500/api/v1/user/find-one-by-id```

Attendus :

```
{
    id: Id de l'utilisateur cherché
}
```

Retourne :

- L'utilisateur correspondant a l'id

#### Delete
Route : ```localhost:6500/api/v1/user/find```

Supprime l'utilisateur

Attendus :

```
{
    id: Id de l'utilisateur cherché
}
```
