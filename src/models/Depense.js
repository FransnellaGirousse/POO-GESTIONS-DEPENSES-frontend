
class Depense {
  constructor(description, montant, categorie, date, pieceJointe = null) {
    this.description = description;
    this.montant = montant;
    this.categorie = categorie;
    this.date = date;
    this.pieceJointe = pieceJointe;
  }
  getpieceJointe() {
    return this.pieceJointe;
  }
  
    getDescription() {
      return this.description;
    }
  
    getMontant() {
      return this.montant;
    }
  
    getCategorie() {
      return this.categorie;
    }
  
    getDate() {
      return this.date;
    }
  
    getId() {
      return `${this.description}-${this.date}`;
    }
  }
  
  export default Depense;
  
  