find . -type d \
  -not -path "*/node_modules/*" \
  -not -path "*/.git/*" \
  -not -path "*/dist/*" \
  -not -path "*/.next/*" \
  -not -path "*/build/*" \
  -not -path "*/__pycache__/*" \
  -not -path "*/venv/*" \
  -not -path "*/.venv/*" \
  2>/dev/null | sort | awk -F'/' '
BEGIN {
    print ""
    print "COMPLETE PROJECT STRUCTURE"
    print "=========================="
    print ""
}
{
    if ($0 == ".") next
    
    # Remove leading "./"
    path = $0
    sub(/^\.\//, "", path)
    
    # Count depth
    depth = split(path, parts, "/")
    
    # Store for hierarchy
    for (i = 1; i <= depth; i++) {
        key = ""
        for (j = 1; j <= i; j++) {
            key = key (j > 1 ? "/" : "") parts[j]
        }
        if (!seen[key]) {
            dirs[++n] = key
            seen[key] = 1
            levels[key] = i
        }
    }
}
END {
    print "can-t-pool-me/"
    
    for (i = 1; i <= n; i++) {
        path = dirs[i]
        depth = levels[path]
        split(path, parts, "/")
        
        # Create indentation
        indent = ""
        for (d = 1; d < depth; d++) {
            indent = indent "│   "
        }
        
        # Determine if last item at this level
        is_last = 1
        for (j = i + 1; j <= n; j++) {
            if (index(dirs[j], path "/") == 1) {
                split(dirs[j], next_parts, "/")
                if (length(next_parts) == depth + 1) {
                    parent = ""
                    for (k = 1; k < depth; k++) {
                        parent = parent (k > 1 ? "/" : "") next_parts[k]
                    }
                    if (parent == (depth > 1 ? path : "")) {
                        is_last = 0
                        break
                    }
                }
            }
        }
        
        connector = "├── "
        print indent connector parts[depth] "/"
    }
    
    print ""
    print "Total directories: " n
}'