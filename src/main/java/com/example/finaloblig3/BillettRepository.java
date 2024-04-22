package com.example.finaloblig3;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class BillettRepository {

    @Autowired
    private JdbcTemplate db;

    public void lagreBillett(Billett b){
        String sql = "INSERT INTO billett (film, antall, fornavn, etternavn, telefonnummer, epost) VALUES (?,?,?,?,?,?)";
        db.update(sql,b.getFilm(),b.getAntall(),b.getFornavn(),b.getEtternavn(),b.getTelefonnummer(),b.getEpost());
    }

    public List<Billett> hentAlleBilletter(){
        String sql = "SELECT * FROM billett ORDER BY etternavn";
        List<Billett> alleBilletter = db.query(sql, new BeanPropertyRowMapper(Billett.class));
        return alleBilletter;
    }

    public void slettAlleKunder(){
        String sql = "DELETE FROM billett";
        db.update(sql);
    }
}
