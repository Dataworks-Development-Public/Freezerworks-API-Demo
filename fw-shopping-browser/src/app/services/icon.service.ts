import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class IconService {

  public getIcon(type: string | undefined): string {
    let path = "assets/"

    switch(type) {
      case "Plasma":                    return path + "plasma.png";
      case "Whole Blood":               return path + "blood.png";
      case "Cells":                     return path + "cells.png";
      case "DNA":                       return path + "dna.png";
      case "RNA":                       return path + "rna.png";
      case "Serum":                     return path + "serum.png";
      case "Urine":                     return path + "urine.png";
      case "Buffy Coat":                return path + "buffycoat.png";
      case "CSF":                       return path + "csf.png";
      case "Brain":                     return path + "brain.png";   
      case "Formalin Fixed Tissue":     return path + "tissue.png";
      case "Paraffin Embedded Tissue":  return path + "tissue.png";
      default:                          return path + "default.png";
    }
  }
}
