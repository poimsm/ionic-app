export class SemanaModel {

    semana = [];

    constructor() {
        this.construirSemana();
    }

    construirSemana() {
        const diasDeLaSemana = ['Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sáb', 'Dom'];
        const fechas = [13, 14, 15, 16, 17, 18, 19];

        diasDeLaSemana.forEach((dia, i) => {
            this.semana.push({
                isActive: false,
                dia: dia,
                num: fechas[i]
            });
            this.semana[0].isActive = true;
        });
    }

  
    
}