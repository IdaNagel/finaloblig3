package com.example.finaloblig3;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;


@RestController
public class HomeController {

    @Autowired
    private BillettRepository rep;

    @PostMapping ("/lagreBillett")
    public void lagreBillett (Billett innbillett){
        rep.lagreBillett(innbillett);
    }

    @GetMapping ("/hentBillett")
    public List<Billett> hentBillett(){
        return rep.hentAlleBilletter();
    }

    @GetMapping ("/slettBilletter")
    public void slettAlle() {
        rep.slettAlleKunder();
    }
}
