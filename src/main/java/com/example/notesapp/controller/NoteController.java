package com.example.notesapp.controller;

import com.example.notesapp.dto.NoteCreateRequest;
import com.example.notesapp.dto.NoteUpdateRequest;
import com.example.notesapp.entity.Note;
import com.example.notesapp.service.NoteService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/notes")
@CrossOrigin(origins = "*")
public class NoteController {
    
    private final NoteService noteService;
    
    @Autowired
    public NoteController(NoteService noteService) {
        this.noteService = noteService;
    }
    
    @PostMapping
    public ResponseEntity<Note> createNote(@Valid @RequestBody NoteCreateRequest request) {
        Note createdNote = noteService.createNote(request);
        return new ResponseEntity<>(createdNote, HttpStatus.CREATED);
    }
    
    @GetMapping
    public ResponseEntity<List<Note>> getAllNotes() {
        List<Note> notes = noteService.getAllNotes();
        return ResponseEntity.ok(notes);
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<Note> getNoteById(@PathVariable Long id) {
        Note note = noteService.getNoteById(id);
        return ResponseEntity.ok(note);
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<Note> updateNote(@PathVariable Long id, 
                                          @Valid @RequestBody NoteUpdateRequest request) {
        Note updatedNote = noteService.updateNote(id, request);
        return ResponseEntity.ok(updatedNote);
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteNote(@PathVariable Long id) {
        noteService.deleteNote(id);
        return ResponseEntity.noContent().build();
    }
}