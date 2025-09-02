package com.example.notesapp.service;

import com.example.notesapp.dto.NoteCreateRequest;
import com.example.notesapp.dto.NoteUpdateRequest;
import com.example.notesapp.entity.Note;
import com.example.notesapp.repository.NoteRepository;
import jakarta.persistence.EntityNotFoundException;
import jakarta.persistence.OptimisticLockException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class NoteService {
    
    private final NoteRepository noteRepository;
    
    @Autowired
    public NoteService(NoteRepository noteRepository) {
        this.noteRepository = noteRepository;
    }
    
    public Note createNote(NoteCreateRequest request) {
        Note note = new Note();
        note.setTitle(request.getTitle());
        note.setContent(request.getContent());
        return noteRepository.save(note);
    }
    
    @Transactional(readOnly = true)
    public List<Note> getAllNotes() {
        return noteRepository.findAll();
    }
    
    @Transactional(readOnly = true)
    public Note getNoteById(Long id) {
        return noteRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Note not found with id: " + id));
    }
    
    public Note updateNote(Long id, NoteUpdateRequest request) {
        Note existingNote = getNoteById(id);
        existingNote.setTitle(request.getTitle());
        existingNote.setContent(request.getContent());
        
        try {
            return noteRepository.save(existingNote);
        } catch (OptimisticLockException e) {
            throw new OptimisticLockException("Note was modified by another user. Please refresh and try again.");
        }
    }
    
    public void deleteNote(Long id) {
        Note note = getNoteById(id);
        noteRepository.delete(note);
    }
}