find . -type f \( -name "*.py" -o -name "*.js" -o -name "*.ts" -o -name "*.tsx" -o -name "*.json" -o -name "*.toml" -o -name "*.yaml" -o -name "*.yml" -o -name "*.md" -o -name "*.sql" -o -name "*.sh" -o -name "*.css" -o -name "*.html" -o -name "*.svg" -o -name "*.png" -o -name "*.jpg" -o -name "*.jpeg" -o -name "*.gif" -o -name "*.ico" -o -name "*.webp" -o -name "*.txt" \) -not -path "*/node_modules/*" -not -path "*/.git/*" -not -path "*/dist/*" -not -path "*/.next/*" -not -path "*/build/*" -not -path "*/__pycache__/*" -not -path "*/venv/*" -not -path "*/.venv/*" -not -path "*/.claude/*" 2>/dev/null | sort | awk -F'/' '
BEGIN {
    print ""
    print "PROJECT STRUCTURE WITH FILES"
    print "============================"
    print ""
}
{
    # Remove leading "./"
    path = $0
    sub(/^\.\//, "", path)
    
    # Store full path
    files[NR] = path
    
    # Track file extensions
    ext = path
    sub(/.*\./, ".", ext)
    extensions[ext]++
    
    # Extract directory path (only if file is in a subdirectory)
    if (index(path, "/") > 0) {
        dir_path = path
        sub(/\/[^\/]*$/, "", dir_path)
        
        # Store all directory levels
        split(dir_path, parts, "/")
        for (i = 1; i <= length(parts); i++) {
            d = ""
            for (j = 1; j <= i; j++) {
                d = d (j > 1 ? "/" : "") parts[j]
            }
            if (d != "" && !seen_dirs[d]) {
                dirs[++dir_count] = d
                seen_dirs[d] = 1
            }
        }
    }
}
END {
    print "can-t-pool-me/"
    print "│"
    
    # Sort directories
    for (i = 1; i <= dir_count; i++) {
        for (j = i + 1; j <= dir_count; j++) {
            if (dirs[i] > dirs[j]) {
                temp = dirs[i]
                dirs[i] = dirs[j]
                dirs[j] = temp
            }
        }
    }
    
    # Create a combined structure: directories with their immediate files
    # First collect all items (dirs and files) with their parent directories
    for (i = 1; i <= dir_count; i++) {
        dir = dirs[i]
        depth = split(dir, parts, "/")
        items[++item_count] = "DIR:" depth ":" dir ":" parts[depth]
    }
    
    # Add files to their respective directories
    for (f = 1; f <= NR; f++) {
        file_path = files[f]
        if (index(file_path, "/") > 0) {
            file_dir = file_path
            sub(/\/[^\/]*$/, "", file_dir)
            depth = split(file_dir, parts, "/") + 1
            split(file_path, file_parts, "/")
            filename = file_parts[length(file_parts)]
            items[++item_count] = "FILE:" depth ":" file_dir ":" filename
        }
    }
    
    # Sort items by directory then by type (dirs first, then files)
    for (i = 1; i <= item_count; i++) {
        for (j = i + 1; j <= item_count; j++) {
            split(items[i], parts_i, ":")
            split(items[j], parts_j, ":")
            
            # Compare by directory path first, then by type (DIR before FILE), then by name
            if (parts_i[3] > parts_j[3] || 
                (parts_i[3] == parts_j[3] && parts_i[1] > parts_j[1]) ||
                (parts_i[3] == parts_j[3] && parts_i[1] == parts_j[1] && parts_i[4] > parts_j[4])) {
                temp = items[i]
                items[i] = items[j]
                items[j] = temp
            }
        }
    }
    
    # Print the sorted structure
    for (i = 1; i <= item_count; i++) {
        split(items[i], parts, ":")
        type = parts[1]
        depth = parts[2]
        name = parts[4]
        
        # Create indentation
        indent = ""
        for (d = 1; d < depth; d++) {
            indent = indent "│   "
        }
        
        if (type == "DIR") {
            print indent "├── " name "/"
        } else {
            print indent "├── " name
        }
    }
    
    # Print root-level files at the bottom
    for (f = 1; f <= NR; f++) {
        file_path = files[f]
        if (index(file_path, "/") == 0) {
            print "├── " file_path
        }
    }
    
    print ""
    print "FILE TYPES FOUND"
    print "================"
    for (ext in extensions) {
        printf "  %-10s : %d files\n", ext, extensions[ext]
    }
    print ""
    print "Total directories: " dir_count
    print "Total files: " NR
}'