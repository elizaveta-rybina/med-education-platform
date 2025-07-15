<?php

namespace App\Models\Content\Assessments;

use Illuminate\Database\Eloquent\Model;

class MatchingSchemaAnswer extends Model
{
    protected $fillable = ['match_key', 'schema_value'];
}
